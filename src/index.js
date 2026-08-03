import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta raíz de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'API REST de Facturación Electrónica v1',
    status: 'online'
  });
});

// Puerto de escucha del servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
