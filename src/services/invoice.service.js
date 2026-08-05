import * as invoiceModel from "../models/invoice.model.js";

export const createInvoice = async (invoiceData) => {

    const {
        customer_name,
        customer_rtn_id = "CF",
        items
    } = invoiceData;

    // Validar datos obligatorios
    if (!customer_name) {
        throw new Error("El nombre del cliente es obligatorio.");
    }

    if (!items || items.length === 0) {
        throw new Error("La factura debe contener al menos un producto.");
    }

    // Llamar al modelo para crear la factura
    return await invoiceModel.createInvoice({
        customer_name,
        customer_rtn_id,
        items
    });

};

export const getInvoices = async () => {

    return await invoiceModel.getInvoices();

};

export const getInvoiceById = async (id) => {

    if (!id) {
        throw new Error("El ID de la factura es obligatorio.");
    }

    return await invoiceModel.getInvoiceById(id);

};

export const voidInvoice = async (id) => {

    if (!id) {
        throw new Error("El ID de la factura es obligatorio.");
    }

    return await invoiceModel.voidInvoice(id);

};