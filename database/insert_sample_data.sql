-- Insert sample data for Inventory Management System (PostgreSQL)
-- Run this script after create_tables.sql to populate with example data

-- Insert sample raw materials
INSERT INTO raw_materials (code, name, stock_quantity) VALUES ('RM001', 'Steel', 1000);
INSERT INTO raw_materials (code, name, stock_quantity) VALUES ('RM002', 'Plastic', 500);
INSERT INTO raw_materials (code, name, stock_quantity) VALUES ('RM003', 'Wood', 300);

-- Insert sample products
INSERT INTO products (code, name, value) VALUES ('P001', 'Chair', 50.00);
INSERT INTO products (code, name, value) VALUES ('P002', 'Table', 100.00);
INSERT INTO products (code, name, value) VALUES ('P003', 'Lamp', 30.00);

-- Insert associations between products and raw materials
-- Chair (P001) requires 10 Steel and 5 Plastic
INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) VALUES (1, 1, 10);
INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) VALUES (1, 2, 5);

-- Table (P002) requires 20 Steel
INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) VALUES (2, 1, 20);

-- Lamp (P003) requires 5 Plastic and 10 Wood
INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) VALUES (3, 2, 5);
INSERT INTO product_raw_materials (product_id, raw_material_id, required_quantity) VALUES (3, 3, 10);

-- Commit the changes (PostgreSQL auto-commits, but good practice)
COMMIT;