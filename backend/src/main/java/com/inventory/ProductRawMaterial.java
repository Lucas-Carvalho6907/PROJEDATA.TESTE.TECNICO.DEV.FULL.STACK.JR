package com.inventory;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Entity
public class ProductRawMaterial extends PanacheEntity {
    @ManyToOne
    public Product product;
    @ManyToOne
    public RawMaterial rawMaterial;
    public Integer requiredQuantity;
}