import connection from "../db/db.js";

/* ===========================
   Productos
=========================== */

export const getProductById = async (productId) => {

    const [rows] = await connection.execute(
        `SELECT *
         FROM products
         WHERE id = ?
         AND is_active = TRUE`,
        [productId]
    );

    return rows;

};

/* ===========================
   Facturas
=========================== */

export const createInvoice = async (invoice) => {

    const [result] = await connection.execute(
        `INSERT INTO invoices
        (
            invoice_number,
            user_id,
            customer_name,
            customer_rtn_id,
            subtotal,
            tax,
            total
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            invoice.invoice_number,
            invoice.user_id,
            invoice.customer_name,
            invoice.customer_rtn_id,
            invoice.subtotal,
            invoice.tax,
            invoice.total
        ]
    );

    return result.insertId;

};

export const createInvoiceDetail = async (detail) => {

    await connection.execute(
        `INSERT INTO invoice_details
        (
            invoice_id,
            product_id,
            quantity,
            unit_price,
            subtotal
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
            detail.invoice_id,
            detail.product_id,
            detail.quantity,
            detail.unit_price,
            detail.subtotal
        ]
    );

};

export const updateStock = async (productId, quantity) => {

    await connection.execute(
        `UPDATE products
         SET stock = stock - ?
         WHERE id = ?`,
        [quantity, productId]
    );

};

export const getInvoices = async () => {

    const [rows] = await connection.execute(
        `SELECT *
         FROM invoices`
    );

    return rows;

};

export const getInvoiceById = async (id) => {

    const [rows] = await connection.execute(
        `SELECT *
         FROM invoices
         WHERE id = ?`,
        [id]
    );

    return rows;

};

export const voidInvoice = async (id) => {

    await connection.execute(
        `UPDATE invoices
         SET status = 'VOIDED'
         WHERE id = ?`,
        [id]
    );

};