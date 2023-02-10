import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';

class MailProviderInMemory implements IMailProvider {
    
    private message: any[] = [];
    
    async sendMail(to: string, subject: string, vars: any, path: string): Promise<void> {
        this.message.push(
            subject,
            vars,
            path
        )
    }

}

export { MailProviderInMemory }