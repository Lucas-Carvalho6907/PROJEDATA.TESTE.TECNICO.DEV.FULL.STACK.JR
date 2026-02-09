package com.inventory;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class Product extends PanacheEntity {
    public String code;
    public String name;
    public Double value;

    @OneToMany(mappedBy = "product")
    public List<ProductRawMaterial> rawMaterials;
}