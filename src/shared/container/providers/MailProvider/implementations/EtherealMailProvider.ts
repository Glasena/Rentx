import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
@injectable()
class EtherealMailProvider implements IMailProvider {

    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            })

            this.client = transporter;

        }).catch((err) => console.log(err))
    }

    async sendMail(to: string, subject: string, vars: any, path: string): Promise<void> {
        
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        
        const templateParse = handlebars.compile(templateFileContent);

        const templateHTML = templateParse(vars);

        const message = await this.client.sendMail({
            to,
            from: "Rentx <noreply@rentx.com.br>",
            subject,
            html: templateHTML
        })

        console.log("%s", message.messageId);
        console.log("%S", nodemailer.getTestMessageUrl(message));
    }

}

export { EtherealMailProvider } 