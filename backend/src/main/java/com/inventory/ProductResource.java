package com.inventory;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @GET
    public List<Product> list() {
        return Product.listAll();
    }

    @POST
    @Transactional
    public Product create(Product product) {
        product.persist();
        return product;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Product update(@PathParam("id") Long id, Product updated) {
        Product product = Product.findById(id);
        if (product != null) {
            product.code = updated.code;
            product.name = updated.name;
            product.value = updated.value;
        }
        return product;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        Product.deleteById(id);
    }
}