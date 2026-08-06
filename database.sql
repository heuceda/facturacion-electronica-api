<<<<<<< HEAD
-- Script de creación de base de datos y tabla de productos.

CREATE DATABASE IF NOT EXISTS facturacion_electronica_db;
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
`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- Tabla de Productos
CREATE TABLE IF NOT EXISTS `products` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `code` VARCHAR(50) NOT NULL UNIQUE,
    `name` VARCHAR(100) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `stock` INT NOT NULL,
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `invoices` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `invoice_number` VARCHAR(50) NOT NULL UNIQUE,
    `user_id` INT NOT NULL,
    `customer_name` VARCHAR(150) NOT NULL,
    `customer_rtn_id` VARCHAR(20) DEFAULT 'CF',
    `subtotal` DECIMAL(10, 2) NOT NULL,
    `tax` DECIMAL(10, 2) NOT NULL,
    `total` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('ISSUED', 'VOIDED') NOT NULL DEFAULT 'ISSUED',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `invoice_details` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `invoice_id` INT NOT NULL,
    `product_id` INT NOT NULL,
    `quantity` INT NOT NULL,
    `unit_price` DECIMAL(10, 2) NOT NULL,
    `subtotal` DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================================
-- 2. DATOS DE PRUEBA
-- =========================================================================

-- Todos los passwords corresponden a "123456"
-- Hash generado y verificado con argon2 (argon2.hash('123456', { salt: 'secret' }))
INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`) VALUES
(1, 'Admin Sistema', 'admin@factura.com', '$argon2id$v=19$m=65536,p=4,t=3$aqUnWrvtw8lYftCBKoaCvA$eY5Q5QkSRig1ZB9o8XWxsUZB4xbE1/sMhRh4/YPNDhg', 'ADMIN'),
(2, 'Cajero Juan', 'juan@factura.com', '$argon2id$v=19$m=65536,p=4,t=3$aqUnWrvtw8lYftCBKoaCvA$eY5Q5QkSRig1ZB9o8XWxsUZB4xbE1/sMhRh4/YPNDhg', 'CASHIER'),
(3, 'Cajera Maria', 'maria@factura.com', '$argon2id$v=19$m=65536,p=4,t=3$aqUnWrvtw8lYftCBKoaCvA$eY5Q5QkSRig1ZB9o8XWxsUZB4xbE1/sMhRh4/YPNDhg', 'CASHIER');

INSERT INTO `products` (`id`, `code`, `name`, `price`, `stock`, `is_active`) VALUES
(1, 'PROD-001', 'Laptop Student 15"', 450.00, 10, TRUE),
(2, 'PROD-002', 'Mouse Inalámbrico', 15.00, 50, TRUE),
(3, 'PROD-003', 'Teclado Mecánico RGB', 65.00, 5, TRUE);
