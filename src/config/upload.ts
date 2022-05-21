import crypto from "crypto";
import multer from "multer";
import { resolve } from "path"

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder),
                filename: (request, file, callback) => {
                    // criar um hash randomico utilizando o crypto
                    const fileHash = crypto.randomBytes(16).toString("hex");

                    // concatenar o hash com o nome do nosso arquivo
                    const fileName = `${fileHash}-${file.originalname}`;

                    return callback(null, fileName);
                },
            }),
        };
    },
};