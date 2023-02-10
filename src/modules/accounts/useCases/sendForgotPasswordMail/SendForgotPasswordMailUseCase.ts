import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';

@injectable()
class SendForgotPasswordMailUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string) {
        
        console.log('instanciou')

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User Does not exists !");
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(3);

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        })

        await this.mailProvider.sendMail(email, "Recuperação de Senha", "O link para o Reset é " + token);

    }

}

export { SendForgotPasswordMailUseCase }