import { AppError } from '../../../../shared/errors/AppError';
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { sign } from "jsonwebtoken"
import { compare } from "bcryptjs";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    }
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }


    async execute({ email, password }: IRequest): Promise<IResponse> {

        // Usuario Existe
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect !");
        }

        // Senha está correta
        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect !");
        }

        // Gerar Token
        const token = sign({}, "26544895d8ece08774811fa74172b533", {
            subject: user.id,
            expiresIn: "1d"
        })

        const tokenReturn: IResponse = {
            token, user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn


    }
}

export { AuthenticateUserUseCase }