import express from "express";
import invoiceRoutes from "./routes/invoice.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();

// Formatea respuestas JSON con saltos de línea para que no se vea todo en una sola línea
app.set("json spaces", 2);

// Middleware CORS nativo sin dependencias externas
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "API REST de Facturación Electrónica v1",
    status: "online"
  });
});

app.use("/api/v1/invoices", invoiceRoutes);
app.use("/api/v1/invoice", invoiceRoutes);

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/product", productRoutes);

export default app;