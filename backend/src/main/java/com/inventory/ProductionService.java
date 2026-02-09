package com.inventory;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.*;

@ApplicationScoped
public class ProductionService {

    public List<ProductionSuggestion> suggestProductions() {
        List<Product> products = Product.listAll();
        List<RawMaterial> rawMaterials = RawMaterial.listAll();

        // Map stock
        Map<Long, Integer> stock = new HashMap<>();
        for (RawMaterial rm : rawMaterials) {
            stock.put(rm.id, rm.stockQuantity);
        }

        // Sort products by value descending
        products.sort((p1, p2) -> Double.compare(p2.value, p1.value));

        List<ProductionSuggestion> suggestions = new ArrayList<>();
        for (Product product : products) {
            int maxQuantity = Integer.MAX_VALUE;
            for (ProductRawMaterial prm : product.rawMaterials) {
                int available = stock.get(prm.rawMaterial.id) / prm.requiredQuantity;
                maxQuantity = Math.min(maxQuantity, available);
            }
            if (maxQuantity > 0) {
                suggestions.add(new ProductionSuggestion(product.code, product.name, maxQuantity, maxQuantity * product.value));
                // Deduct from stock (simulate)
                for (ProductRawMaterial prm : product.rawMaterials) {
                    stock.put(prm.rawMaterial.id, stock.get(prm.rawMaterial.id) - maxQuantity * prm.requiredQuantity);
                }
            }
        }
        return suggestions;
    }
}