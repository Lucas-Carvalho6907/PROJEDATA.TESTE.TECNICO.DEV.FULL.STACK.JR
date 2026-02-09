package com.inventory;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class RawMaterial extends PanacheEntity {
    public String code;
    public String name;
    public Integer stockQuantity;

    @OneToMany(mappedBy = "rawMaterial")
    public List<ProductRawMaterial> products;
}