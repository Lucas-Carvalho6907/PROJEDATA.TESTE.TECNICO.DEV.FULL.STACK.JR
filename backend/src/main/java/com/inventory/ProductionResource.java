package com.inventory;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/production")
@Produces(MediaType.APPLICATION_JSON)
public class ProductionResource {

    @Inject
    ProductionService service;

    @GET
    @Path("/suggestions")
    public List<ProductionSuggestion> getSuggestions() {
        return service.suggestProductions();
    }
}