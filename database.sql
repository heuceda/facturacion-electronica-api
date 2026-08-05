
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('CASHIER', 'ADMIN') NOT NULL DEFAULT 'CASHIER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(50) NOT NULL UNIQUE,
    user_id INT NOT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_rtn_id VARCHAR(20) DEFAULT 'CF',
    subtotal DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('ISSUED','VOIDED') NOT NULL DEFAULT 'ISSUED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_invoice_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);




CREATE TABLE IF NOT EXISTS invoice_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_detail_invoice
        FOREIGN KEY (invoice_id)
        REFERENCES invoices(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_detail_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE
);