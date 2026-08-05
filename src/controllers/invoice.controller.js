import * as invoiceService from "../services/invoice.service.js";

export const createInvoice = async (req, res) => {
    try {

        const invoice = await invoiceService.createInvoice(req.body);

        res.status(201).json(invoice);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

export const getInvoices = async (req, res) => {
    try {

        const invoices = await invoiceService.getInvoices();

        res.status(200).json(invoices);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getInvoiceById = async (req, res) => {
    try {

        const { id } = req.params;

        const invoice = await invoiceService.getInvoiceById(id);

        res.status(200).json(invoice);

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message
        });

    }
};

export const voidInvoice = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await invoiceService.voidInvoice(id);

        res.status(200).json(result);

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};