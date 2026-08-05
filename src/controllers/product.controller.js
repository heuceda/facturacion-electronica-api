import { ProductModel } from '../models/product.model.js';

export const ProductController = {
  // GET 
  async getProducts(req, res) {
    try {
      const products = await ProductModel.getActiveProducts();
      return res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      console.error('Error al obtener productos:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor al obtener la lista de productos'
      });
    }
  },

  // POST 
  async createProduct(req, res) {
    try {
      const { code, name, price, stock } = req.body;

      // 1. Validaciones de campos requeridos
      if (!code || typeof code !== 'string' || !code.trim()) {
        return res.status(400).json({
          success: false,
          message: 'El código del producto es obligatorio'
        });
      }

      if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: 'El nombre del producto es obligatorio'
        });
      }

      // 2. Validación de precio (no negativo)
      const numericPrice = Number(price);
      if (isNaN(numericPrice) || numericPrice <= 0) {
        return res.status(400).json({
          success: false,
          message: 'El precio debe ser un número mayor a 0'
        });
      }

      // 3. Validación de stock 
      const numericStock = stock !== undefined ? Number(stock) : 0;
      if (isNaN(numericStock) || numericStock < 0 || !Number.isInteger(numericStock)) {
        return res.status(400).json({
          success: false,
          message: 'El stock debe ser un número entero mayor o igual a 0'
        });
      }

      // 4. Validación de código único
      const existingProduct = await ProductModel.getProductByCode(code.trim());
      if (existingProduct) {
        return res.status(400).json({
          success: false,
          message: `El código de producto '${code.trim()}' ya se encuentra registrado`
        });
      }

      // 5. Crear el producto en la base de datos
      const newProductId = await ProductModel.createProduct({
        code: code.trim(),
        name: name.trim(),
        price: numericPrice,
        stock: numericStock
      });

      const newProduct = await ProductModel.getProductById(newProductId);

      return res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: newProduct
      });
    } catch (error) {
      console.error('Error al crear producto:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor al registrar el producto'
      });
    }
  },

  // PATCH 
  async updateStock(req, res) {
    try {
      const { id } = req.params;
      const { stock_to_add } = req.body;

      // 1. Validar ID
      const productId = Number(id);
      if (isNaN(productId) || productId <= 0) {
        return res.status(400).json({
          success: false,
          message: 'El ID del producto no es válido'
        });
      }

      // 2. Validación de cantidad a incrementar 
      const numericQuantity = Number(stock_to_add);
      if (isNaN(numericQuantity) || numericQuantity <= 0 || !Number.isInteger(numericQuantity)) {
        return res.status(400).json({
          success: false,
          message: 'El campo stock_to_add debe ser un número entero mayor a 0'
        });
      }

      // 3. Verificar existencia del producto
      const product = await ProductModel.getProductById(productId);
      if (!product || !product.is_active) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado o inactivo'
        });
      }

      // 4. Actualizar stock
      await ProductModel.increaseStock(productId, numericQuantity);

      const updatedProduct = await ProductModel.getProductById(productId);

      return res.status(200).json({
        success: true,
        message: 'Stock de inventario actualizado exitosamente',
        data: updatedProduct
      });
    } catch (error) {
      console.error('Error al actualizar stock:', error);
      return res.status(500).json({
        success: false,
        message: 'Error interno del servidor al actualizar el inventario'
      });
    }
  }
};
