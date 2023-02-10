import { AppError } from '@shared/errors/AppError';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    
    beforeEach(() => {
        
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory, 
            usersTokensRepositoryInMemory, 
            dateProvider, 
            mailProvider
        );

    })
    
    it("should be able to send a forgot password mail to user", async () => {

        const sendMail = jest.spyOn(mailProvider, "sendMail");

        await usersRepositoryInMemory.create({
            driver_license: "077612",
            email: "dihur@we.fj",
            name: "Lida Ray",
            password: "Bosnia&Herzegovina"
        })

        await sendForgotPasswordMailUseCase.execute("dihur@we.fj");

        expect(sendMail).toHaveBeenCalled();

    })

    it("Should not be able to send an e-mail if user does not exists", async () => {
        
        await expect(
            sendForgotPasswordMailUseCase.execute("fo@wu.ro")
        ).rejects.toEqual( new AppError("User Does not exists !"))
        
        
    })

    it("Should Create a users token", async () => {
        const genereateToken = jest.spyOn(usersTokensRepositoryInMemory, "create");

        await usersRepositoryInMemory.create({
            driver_license: "077a612",
            email: "todifakok@tiukwo.ua",
            name: "Corey Davidson",
            password: "French_Polynesia"
        });

        await sendForgotPasswordMailUseCase.execute("todifakok@tiukwo.ua");

        expect(genereateToken).toHaveBeenCalled();

    })

})