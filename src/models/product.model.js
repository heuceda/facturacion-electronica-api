import pool from '../config/db.js';

export const ProductModel = {
  
  async getActiveProducts() {
    const [rows] = await pool.query(
      'SELECT id, code, name, price, stock, is_active, created_at FROM products WHERE is_active = TRUE ORDER BY id DESC'
    );
    return rows;
  },

  async getProductById(id) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0] || null;
  },

  // Buscar un producto por su código único
  async getProductByCode(code) {
    const [rows] = await pool.query('SELECT * FROM products WHERE code = ?', [code]);
    return rows[0] || null;
  },

  async createProduct({ code, name, price, stock }) {
    const [result] = await pool.query(
      'INSERT INTO products (code, name, price, stock) VALUES (?, ?, ?, ?)',
      [code, name, price, stock || 0]
    );
    return result.insertId;
  },

  // Aumentar/sumar inventario (stock_to_add)
  async increaseStock(id, quantity) {
    const [result] = await pool.query(
      'UPDATE products SET stock = stock + ? WHERE id = ? AND is_active = TRUE',
      [quantity, id]
    );
    return result.affectedRows > 0;
  },

  // Para establecer/fijar inventario directamente a un valor exacto 
  async setStock(id, newStock) {
    const [result] = await pool.query(
      'UPDATE products SET stock = ? WHERE id = ? AND is_active = TRUE',
      [newStock, id]
    );
    return result.affectedRows > 0;
  }
};
