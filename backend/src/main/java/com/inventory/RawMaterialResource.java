package com.inventory;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/raw-materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialResource {

    @GET
    public List<RawMaterial> list() {
        return RawMaterial.listAll();
    }

    @POST
    @Transactional
    public RawMaterial create(RawMaterial rawMaterial) {
        rawMaterial.persist();
        return rawMaterial;
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public RawMaterial update(@PathParam("id") Long id, RawMaterial updated) {
        RawMaterial rawMaterial = RawMaterial.findById(id);
        if (rawMaterial != null) {
            rawMaterial.code = updated.code;
            rawMaterial.name = updated.name;
            rawMaterial.stockQuantity = updated.stockQuantity;
        }
        return rawMaterial;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        RawMaterial.deleteById(id);
    }
}