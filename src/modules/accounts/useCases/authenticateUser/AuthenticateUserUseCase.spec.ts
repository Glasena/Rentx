import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider;

describe("Authenticate User", () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory, userTokensRepositoryInMemory, dateProvider);
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

    it("Should not be able to authenticate an nonexistent user", async () => {
        await expect(authenticateUserUseCase.execute({
                email: "false@mail.com",
                password: "123456",
            })
        ).rejects.toEqual({message: "User Does Not Exists !", "statusCode": 400})
    });

    it("Should not be able to authenticate with incorrect password", async () => {

        const user: ICreateUserDTO = {
            driver_license: "9999",
            email: "fail@mail.com",
            password: "password",
            name: "User Test Error"
        }

        await createUserUseCase.execute(user);

        await expect(authenticateUserUseCase.execute({
                email: user.email,
                password: "IncorrectPassword"
            })

        ).rejects.toEqual({message: "Email or password incorrect !", statusCode: 400})
    })

});