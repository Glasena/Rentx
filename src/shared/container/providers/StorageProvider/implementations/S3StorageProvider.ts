import { IStorageProvider } from "../IStorageProvider";
import { AWSError, S3 } from "aws-sdk";
import { resolve } from "path";
import fs from "fs";
import mime from "mime";
import upload from "../../../../../config/upload";

class S3StorageProvider implements IStorageProvider {
    
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION
        })
    }
    
    
    async save(file: string, folder: string): Promise<string> {
        const originalName = resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalName);

        const ContentType = mime.getType(originalName);

        const putParams = {
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: "public-read",
            Body: fileContent,
            ContentType: ContentType || undefined,
        }

        await this.client.putObject(putParams).promise();

        await fs.promises.unlink(originalName);

        return file;

    }
    async delete(file: string, folder: string): Promise<void> {
        
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file
        }).promise();

    }

}

export { S3StorageProvider }