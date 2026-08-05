import { Router } from 'express';
import { ProductController } from '../controllers/product.controller.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

// GET - Lista de productos activos
router.get('/', ProductController.getProducts);

// POST - Crear un producto nuevo
router.post('/', authenticate, authorizeRoles('ADMIN'), ProductController.createProduct);

// PATCH - Aumentar inventario de un producto 
router.patch('/:id/stock', authenticate, authorizeRoles('ADMIN'), ProductController.updateStock);

export default router;
