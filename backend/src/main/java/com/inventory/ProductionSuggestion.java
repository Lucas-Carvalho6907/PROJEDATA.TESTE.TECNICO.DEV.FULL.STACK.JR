package com.inventory;

public class ProductionSuggestion {
    public String productCode;
    public String productName;
    public Integer quantity;
    public Double totalValue;

    public ProductionSuggestion(String productCode, String productName, Integer quantity, Double totalValue) {
        this.productCode = productCode;
        this.productName = productName;
        this.quantity = quantity;
        this.totalValue = totalValue;
    }
}