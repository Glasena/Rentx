import { getConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import createConnection from "../index";

async function create() {
    const connection = await createConnection("localhost");

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(`INSERT INTO USERS(ID, NAME, EMAIL, PASSWORD, "isAdmin", CREATED_AT, DRIVER_LICENSE)
        VALUES('${id}', 'Admin','admin@rentx.com.br', '${password}', true, 'Now()', 'ADM-123')`);
}

create().then(() => console.log("Admin created"));
