import { Car } from "modules/cars/infra/typeorm/entities/Car";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";

interface ICarsRepository {

    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(licensePlate: string): Promise<Car>;

}

export { ICarsRepository };