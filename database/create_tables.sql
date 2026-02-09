-- Create tables for Inventory Management System (PostgreSQL)
-- Run this script first to set up the database schema

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    value DECIMAL(10,2) NOT NULL
);

-- Raw Materials table
CREATE TABLE raw_materials (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    stock_quantity INTEGER NOT NULL
);

-- Product-Raw Material associations table
CREATE TABLE product_raw_materials (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    raw_material_id INTEGER NOT NULL,
    required_quantity INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (raw_material_id) REFERENCES raw_materials(id) ON DELETE CASCADE,
    UNIQUE (product_id, raw_material_id)
);

-- Optional: Create indexes for better performance
CREATE INDEX idx_products_code ON products(code);
CREATE INDEX idx_raw_materials_code ON raw_materials(code);
CREATE INDEX idx_product_raw_materials_product_id ON product_raw_materials(product_id);
CREATE INDEX idx_product_raw_materials_raw_material_id ON product_raw_materials(raw_material_id);