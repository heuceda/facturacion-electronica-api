import express from "express";
import {
    createInvoice,
    getInvoices,
    getInvoiceById,
    voidInvoice
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.post("/", createInvoice);

router.get("/", getInvoices);

router.get("/:id", getInvoiceById);

router.patch("/:id/void", voidInvoice);

export default router;