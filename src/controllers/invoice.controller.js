
import InvoiceModel from "../models/invoice.model.js";
import { jsonresponse } from "../helpers/json_response.js";

export const createInvoice = async (req, res) => {

    try {

        const invoice = await InvoiceModel.createInvoice({
            ...req.body,
            user_id: req.user.id
        });

        return res.status(201).json(
            jsonresponse({
                status: 201,
                message: "Factura creada correctamente.",
                data: invoice
            })
        );

    } catch (error) {

        return res.status(400).json(
            jsonresponse({
                status: 400,
                message: error.message,
                data: null
            })
        );

    }

};

export const getInvoices = async (req, res) => {

    try {

        const invoices = await InvoiceModel.getInvoices();

        return res.status(200).json(
            jsonresponse({
                status: 200,
                message: "Facturas obtenidas correctamente.",
                data: invoices
            })
        );

    } catch (error) {

        return res.status(500).json(
            jsonresponse({
                status: 500,
                message: error.message,
                data: null
            })
        );

    }

};

export const getInvoiceById = async (req, res) => {

    try {

        const invoice = await InvoiceModel.getInvoiceById(req.params.id);

        if (!invoice) {

            return res.status(404).json(
                jsonresponse({
                    status: 404,
                    message: "Factura no encontrada.",
                    data: null
                })
            );

        }

        return res.status(200).json(
            jsonresponse({
                status: 200,
                message: "Factura obtenida correctamente.",
                data: invoice
            })
        );

    } catch (error) {

        return res.status(500).json(
            jsonresponse({
                status: 500,
                message: error.message,
                data: null
            })
        );

    }

};

export const voidInvoice = async (req, res) => {

    try {

        const affectedRows = await InvoiceModel.voidInvoice(req.params.id);

        if (affectedRows === 0) {

            return res.status(404).json(
                jsonresponse({
                    status: 404,
                    message: "Factura no encontrada.",
                    data: null
                })
            );

        }

        return res.status(200).json(
            jsonresponse({
                status: 200,
                message: "Factura anulada correctamente.",
                data: null
            })
        );

    } catch (error) {

        return res.status(500).json(
            jsonresponse({
                status: 500,
                message: error.message,
                data: null
            })
        );

    }

};