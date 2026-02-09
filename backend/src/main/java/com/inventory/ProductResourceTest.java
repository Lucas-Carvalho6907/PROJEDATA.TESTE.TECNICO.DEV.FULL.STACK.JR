package com.inventory;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class ProductResourceTest {

    @Test
    public void testListProducts() {
        given()
          .when().get("/products")
          .then()
             .statusCode(200);
    }

    @Test
    public void testCreateProduct() {
        given()
          .body("{\"code\":\"P003\",\"name\":\"Lamp\",\"value\":30.0}")
          .header("Content-Type", "application/json")
          .when().post("/products")
          .then()
             .statusCode(200);
    }
}