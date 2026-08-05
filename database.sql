--Asegurar que usamos la base de datos correcta configurada en el Docker Compose
USE `facturacion_electronica_db`;

-- =========================================================================
-- 1. TABLAS PRINCIPALES
-- =========================================================================

CREATE TABLE IF NOT EXISTS `users` (
`id` INT AUTO_INCREMENT PRIMARY KEY,
`name` varchar(100) NOT NULL,
`email` varchar(100) NOT NULL,
`password_hash` varchar(255) NOT NULL,
`role` ENUM (`CASHIER`, `ADMIN`) NOT NULL DEFAULT `CASHIER`,
`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Script de creación de base de datos y tabla de productos.

CREATE DATABASE IF NOT EXISTS facturacion_electronica_db;
USE facturacion_electronica_db;

-- Tabla de Productos
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
