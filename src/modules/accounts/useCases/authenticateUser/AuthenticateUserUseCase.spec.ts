import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@test.com",
            password: "1234",
            name: "User Test"
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");

    });

    it("Should not be able to authenticate an nonexistent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@mail.com",
                password: "123456",
            })
        }).rejects.toBeInstanceOf(AppError)
    });

    it("Should not be able to authenticate with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "9999",
                email: "fail@mail.com",
                password: "password",
                name: "User Test Error"
            }

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "IncorrectPassword"
            })

        }).rejects.toBeInstanceOf(AppError)
    })

});