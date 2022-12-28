import { app } from "@shared/infra/http/app";
import request  from "supertest";

describe("Create Category Controller", async () => {

    it("Should be Able to Create a New Category", async () => {
        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest Description"
        });

        expect(response.status).toBe(201);

    });
});