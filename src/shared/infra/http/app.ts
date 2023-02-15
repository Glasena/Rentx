/* prettier-ignore-start */
import "reflect-metadata";

import express, { NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "../../errors/AppError";
import { router } from "./routes";
import swaggerFile from "../../../swagger.json"

import createConnection from "@shared/infra/typeorm";
import "../../container";

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router);

// @ts-ignore
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        // @ts-ignore
        return response.status(err.statusCode).json({
            message: err.message
        });
    }
    // @ts-ignore
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });

})

export { app }
