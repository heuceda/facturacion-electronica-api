import { ProductModel } from '../models/product.model.js';
import { validateProduct, validateAddStock } from '../schemas/product.schema.js';
import { jsonresponse } from '../helpers/jsonresponse.js';

  // GET 
  export const getProducts = async (req, res) => {
    try {

      const products = await ProductModel.getActiveProducts();

      return res.status(200).json({
        message: 'Listado de productos',
        data: products
      });

    } catch (error) {
      console.error('Error al obtener productos:', error);
      return res.status(500).json({
        status: 500,
        message: 'Error interno del servidor al obtener la lista de productos'
      });
    }
  }

  // POST 
  export const createProduct = async (req, res) => {

    const { success, data, error } = validateProduct(req.body)

    if (!success) {
        return res.status(400).json(jsonResponse({
            status: 400,
            message: 'No pasó las validaciones',
            data: JSON.parse(error.message)
        }))
    }

    try {

        const newProduct = await ProductModel.createProduct(data)

        return res.status(201).json(jsonResponse({
            status: 201,
            message: 'Producto creado',
            data: newProduct
        }))

    } catch (e) {

        // el código de producto es UNIQUE en la base de datos
        if (e.code === 'ER_DUP_ENTRY') {
            return res.status(400).json(jsonResponse({
                status: 400,
                message: 'El código de producto ya existe'
            }))
        }

        console.log(e)
        return res.status(500).json(jsonResponse({ status: 500, message: 'Error interno del servidor' }))
    }
}

  // PATCH 
  export const increaseStock = async (req, res) => {

    const { id } = req.params
    const { success, data, error } = validateAddStock(req.body)

    if (!success) {
        return res.status(400).json(jsonResponse({
            status: 400,
            message: 'No pasó las validaciones',
            data: JSON.parse(error.message)
        }))
    }

    try {

        const updated = await ProductModel.increaseStock(id, data.stock_to_add)

        if (!updated) {
            return res.status(404).json(jsonResponse({
                status: 404,
                message: 'Producto no encontrado'
            }))
        }

        return res.status(200).json(jsonResponse({
            status: 200,
            message: 'Inventario actualizado',
            data: updated
        }))

    } catch (e) {
        console.log(e)
        return res.status(500).json(jsonResponse({ status: 500, message: 'Error interno del servidor' }))
    }
}

