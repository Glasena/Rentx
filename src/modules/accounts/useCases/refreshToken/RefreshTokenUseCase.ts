import { AppError } from './../../../../shared/errors/AppError';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { verify, sign } from "jsonwebtoken";
import { inject } from "tsyringe";
import auth from "@config/auth";
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IPayLoad {
    user_id: string;
    email: string;
}

class RefreshTokenUseCase {

    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider
    ) {}

    async execute(token: string): Promise<string> {
        
        const { email, user_id } = verify(token, auth.secret_refresh_token) as IPayLoad;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

        if(!userToken) {
            throw new AppError("Refresh Token does not Exists !");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign({ email }, auth.secret_refresh_token, { subject: user_id, expiresIn: auth.expires_in_refresh_token });

        const expires_date = this.dateProvider.addDays(auth.expires_refresh_token_days);

        await this.usersTokensRepository.create({
            expires_date, refresh_token, user_id
        })

        return refresh_token;

    }
}

export { RefreshTokenUseCase }