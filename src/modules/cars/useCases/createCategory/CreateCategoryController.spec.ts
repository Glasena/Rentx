import { app } from "@shared/infra/http/app";
import request  from "supertest";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";
import createConnection from "@shared/infra/typeorm"
import { Connection } from "typeorm";

let connection: Connection;

describe("Create Category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);

        await connection.query(`INSERT INTO USERS(ID, NAME, EMAIL, PASSWORD, "isAdmin", CREATED_AT, DRIVER_LICENSE)
            VALUES('${id}', 'Admin','admin@rentx.com.br', '${password}', true, 'Now()', 'ADM-123')`);

    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be Able to Create a New Category", async () => {

        const responseToken = await request(app).post("/sessions").send({
            email: 'admin@rentx.com.br',
            password: 'admin'
        });

        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "Category Supertest",
            description: "Category Supertest Description"
        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(201);

    });
});