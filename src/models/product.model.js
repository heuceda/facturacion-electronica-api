import pool from '../db/db.js';

export default class ProductModel {
  

  static getActiveProducts = async () => {

        const conn = await pool.getConnection()

        try {
            const [rows] = await conn.query(
                'SELECT id, code, name, price, stock FROM products WHERE is_active = TRUE ORDER BY id'
            )

            return rows

        } finally {
            conn.release()
        }
    }

    static createProduct = async (product) => {

        const conn = await pool.getConnection()

        try {
            const [result] = await conn.execute(
                'INSERT INTO products (code, name, price, stock) VALUES (?, ?, ?, ?)',
                [product.code, product.name, product.price, product.stock]
            )

            return { id: result.insertId, ...product, is_active: true }

        } finally {
            conn.release()
        }
    }

  // Suma stock_to_add al stock actual (nunca resta: para eso existe la venta/anulación)
    static increaseStock = async (id, stockToAdd) => {

        const conn = await pool.getConnection()

        try {
            const [result] = await conn.execute(
                'UPDATE products SET stock = stock + ? WHERE id = ?',
                [stockToAdd, id]
            )

            if (result.affectedRows === 0) return null

            const [rows] = await conn.execute(
                'SELECT id, code, name, price, stock FROM products WHERE id = ?',
                [id]
            )

            return rows[0]

        } finally {
            conn.release()
        }
    }
}

