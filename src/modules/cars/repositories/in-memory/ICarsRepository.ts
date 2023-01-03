import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";

interface ICarsRepository {

    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(licensePlate: string): Promise<Car>;
    findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };