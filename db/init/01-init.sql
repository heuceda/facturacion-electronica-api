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