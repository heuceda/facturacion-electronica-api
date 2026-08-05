--Asegurar que usamos la base de datos correcta configurada en el Docker Compose
USE `facturacion_electronica_db`;

-- =========================================================================
-- 1. TABLAS PRINCIPALES
-- =========================================================================

CREATE TABLE IF NOT EXISTS `users` (
`id` binary(16) NOT NULL,
`name` varchar(100) NOT NULL,
`email` varchar(100) NOT NULL,
`password_hash` varchar(255) NOT NULL,
`role` ENUM (`CASHIER`, `ADMIN`) NOT NULL DEFAULT `CASHIER`,
`created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`),
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;