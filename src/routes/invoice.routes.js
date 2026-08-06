import express from "express";
import {
    createInvoice,
    getInvoices,
    getInvoiceById,
    voidInvoice
} from "../controllers/invoice.controller.js";
import { isAuth} from "../middlewares/isAuth.js";
import {isAdmin} from "../middlewares/isAdmin.js";

const invoicerouter = express.Router();

invoicerouter.post("/", isAuth, createInvoice);

invoicerouter.get("/", isAuth, getInvoices);

invoicerouter.get("/:id", isAuth, getInvoiceById);

//solo para Admin
invoicerouter.patch("/:id/void", isAuth, isAdmin, voidInvoice);

export default invoicerouter;