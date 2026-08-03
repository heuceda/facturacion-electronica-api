-- Script de las tablas de Facturación Electrónica, para la creación de la base de datos.

CREATE DATABASE IF NOT EXISTS facturacion_electronica_db;
USE facturacion_electronica_db;

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK,
  stock INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);
