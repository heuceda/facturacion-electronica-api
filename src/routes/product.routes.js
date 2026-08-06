import { Router } from 'express';
import { getProducts, createProduct, updateStock, increaseStock } from '../controllers/product.controller.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { isAuth } from '../middlewares/isAuth.js';

const Productrouter = Router();

// GET - Lista de productos activos
Productrouter.get('/', getProducts);

// POST - Crear un producto nuevo
Productrouter.post('/', isAuth, isAdmin, createProduct);

// PATCH - Aumentar inventario de un producto 
Productrouter.patch('/:id/stock', isAuth, isAdmin, increaseStock);

export default Productrouter;
