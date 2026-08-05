import express from "express";
import invoiceRoutes from "./routes/invoice.routes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/invoices", invoiceRoutes);

export default app;