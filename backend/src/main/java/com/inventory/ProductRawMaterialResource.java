package com.inventory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/product-raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductRawMaterialResource {

    @GET
    public List<ProductRawMaterial> list() {
        return ProductRawMaterial.listAll();
    }

    @POST
    @Transactional
    public ProductRawMaterial create(ProductRawMaterial prm) {
        prm.persist();
        return prm;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public ProductRawMaterial update(@PathParam("id") Long id, ProductRawMaterial updated) {
        ProductRawMaterial prm = ProductRawMaterial.findById(id);
        if (prm != null) {
            prm.product = updated.product;
            prm.rawMaterial = updated.rawMaterial;
            prm.requiredQuantity = updated.requiredQuantity;
        }
        return prm;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        ProductRawMaterial.deleteById(id);
    }
}