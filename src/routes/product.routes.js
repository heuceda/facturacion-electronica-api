import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isAuth } from '../middlewares/isAuth.js';

const Productrouter = Router();

// GET - Lista de productos activos
Productrouter.get('/', ProductController.getProducts);

// POST - Crear un producto nuevo
Productrouter.post('/', isAuth, isAdmin, ProductController.createProduct);

// PATCH - Aumentar inventario de un producto 
Productrouter.patch('/:id/stock', isAuth, isAdmin, ProductController.updateStock);

export default router;
