import * as facturaService from "../services/invoice.service.js";

export const createInvoice = async (req, res) => {

};

export const getInvoices = async (req, res) => {
    res.status(200).json({
        message: "Ruta de facturas funcionando correctamente."
    });
};

export const getInvoiceById = async (req, res) => {

};

export const voidInvoice = async (req, res) => {

};