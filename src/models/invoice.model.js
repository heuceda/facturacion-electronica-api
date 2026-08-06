import pool from "../db/db.js";

export default class InvoiceModel {

    static getInvoices = async () => {

        const conn = await pool.getConnection();

        try {

            const [rows] = await conn.query(`
                SELECT
                    id,
                    invoice_number,
                    user_id,
                    customer_name,
                    customer_rtn_id,
                    subtotal,
                    tax,
                    total,
                    status,
                    created_at
                FROM invoices
                ORDER BY created_at DESC
            `);

            return rows;

        } finally {
            conn.release();
        }
    };

    static getInvoiceById = async (id) => {

        const conn = await pool.getConnection();

        try {

            const [invoice] = await conn.execute(
                `
                SELECT
                    id,
                    invoice_number,
                    user_id,
                    customer_name,
                    customer_rtn_id,
                    subtotal,
                    tax,
                    total,
                    status,
                    created_at
                FROM invoices
                WHERE id = ?
                `,
                [id]
            );

            if (invoice.length === 0) {
                return null;
            }

            const [details] = await conn.execute(
                `
                SELECT
                    d.product_id,
                    p.name,
                    d.quantity,
                    d.unit_price,
                    d.subtotal
                FROM invoice_details d
                INNER JOIN products p
                    ON d.product_id = p.id
                WHERE d.invoice_id = ?
                `,
                [id]
            );

            return {
                ...invoice[0],
                details
            };

        } finally {
            conn.release();
        }
    };

    static voidInvoice = async (id) => {

        const conn = await pool.getConnection();

        try {

            await conn.beginTransaction();

            const [invoices] = await conn.execute(
                `
                SELECT status
                FROM invoices
                WHERE id = ?
                `,
                [id]
            );

            if (invoices.length === 0) {
                throw new Error("Factura no encontrada.");
            }

            if (invoices[0].status === "VOIDED") {
                throw new Error("La factura ya fue anulada.");
            }

            const [details] = await conn.execute(
                `
                SELECT
                    product_id,
                    quantity
                FROM invoice_details
                WHERE invoice_id = ?
                `,
                [id]
            );

            for (const detail of details) {

                await conn.execute(
                    `
                    UPDATE products
                    SET stock = stock + ?
                    WHERE id = ?
                    `,
                    [
                        detail.quantity,
                        detail.product_id
                    ]
                );

            }

            await conn.execute(
                `
                UPDATE invoices
                SET status = 'VOIDED'
                WHERE id = ?
                `,
                [id]
            );

            await conn.commit();

            return result.affectedRows;

        } catch (error) {

            await conn.rollback();

            throw error;

        } finally {

            conn.release();

        }

    };

    static createInvoice = async (invoice) => {

        const conn = await pool.getConnection();

        try {

            await conn.beginTransaction();

            const {
                user_id,
                customer_name,
                customer_rtn_id = "CF",
                items
            } = invoice;

            if (!user_id) {
                throw new Error("Usuario no autenticado.");
            }

            if (!customer_name) {
                throw new Error("El nombre del cliente es obligatorio.");
            }

            if (!items || items.length === 0) {
                throw new Error("La factura debe contener al menos un producto.");
            }

            let subtotal = 0;
            let tax = 0;
            let total = 0;

            const invoiceNumber = `FAC-${Date.now()}`;

            const invoiceDetails = [];

            for (const item of items) {

                const [products] = await conn.execute(
                    `
                    SELECT
                        id,
                        name,
                        price,
                        stock
                    FROM products
                    WHERE id = ?
                    AND is_active = TRUE
                    `,
                    [item.product_id]
                );

                if (products.length === 0) {
                    throw new Error(`Producto ${item.product_id} no encontrado.`);
                }

                const product = products[0];

                if (product.stock < item.quantity) {
                    throw new Error(
                        `Stock insuficiente para ${product.name}.`
                    );
                }

                const itemSubtotal = Number(product.price) * item.quantity;

                subtotal += itemSubtotal;

                invoiceDetails.push({
                    product_id: product.id,
                    quantity: item.quantity,
                    unit_price: product.price,
                    subtotal: itemSubtotal
                });

            }

            tax = subtotal * 0.15;
            total = subtotal + tax;

            const [invoiceResult] = await conn.execute(
                `
                INSERT INTO invoices
                (
                    invoice_number,
                    user_id,
                    customer_name,
                    customer_rtn_id,
                    subtotal,
                    tax,
                    total
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    invoiceNumber,
                    user_id,
                    customer_name,
                    customer_rtn_id,
                    subtotal,
                    tax,
                    total
                ]
            );

            const invoiceId = invoiceResult.insertId;

            for (const detail of invoiceDetails) {

                await conn.execute(
                    `
                    INSERT INTO invoice_details
                    (
                        invoice_id,
                        product_id,
                        quantity,
                        unit_price,
                        subtotal
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [
                        invoiceId,
                        detail.product_id,
                        detail.quantity,
                        detail.unit_price,
                        detail.subtotal
                    ]
                );

            }

            for (const detail of invoiceDetails) {

                await conn.execute(
                    `
                    UPDATE products
                    SET stock = stock - ?
                    WHERE id = ?
                    `,
                    [
                        detail.quantity,
                        detail.product_id
                    ]
                );

            }

            await conn.commit();

            return {
                id: invoiceId,
                invoice_number: invoiceNumber,
                subtotal,
                tax,
                total
            };


        } catch (error) {

            await conn.rollback();

            throw error;

        } finally {

            conn.release();

        }

    };

}