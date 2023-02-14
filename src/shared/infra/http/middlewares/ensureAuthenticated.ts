import { AppError } from '../../../errors/AppError';
import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import auth from '@config/auth';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token is required", 401);
    }

    // Bearer 156D45ASDDGFSDFSD5F1S5D
    // [0] = Bearer
    // [1] = 156D45ASDDGFSDFSD5F1S5D


    const [, token] = authHeader.split(" ");

    // Verifica se o token é valido, necessário verificar com try catch devido ao retorno da função
    try {

        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;


        request.user = {
            id: user_id
        }

        next();

    } catch {
        throw new AppError("Invalid Token", 401);
    }

}