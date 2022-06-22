import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/in-memory/ICarsRepository';

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

class ListCarsUseCase {

    constructor(
        private carsRepository: ICarsRepository
    ) { }

    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(brand, category_id, name)

        return cars;

    }
}

export { ListCarsUseCase }