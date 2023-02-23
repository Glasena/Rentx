import { container } from "tsyringe"
import { LocalStorageProvider } from "./implementations/LocalStorageProvider"
import { S3StorageProvider } from "./implementations/S3StorageProvider"
import { IStorageProvider } from "./IStorageProvider"
import "dotenv/config";

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
)