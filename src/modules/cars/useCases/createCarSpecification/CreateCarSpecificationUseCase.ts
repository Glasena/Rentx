import { AppError } from './../../../../shared/errors/AppError';
import { ICarsRepository } from "@modules/cars/repositories/in-memory/ICarsRepository";
import { inject } from "tsyringe";
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

class CreateCarSpecificationUseCase {

    constructor(
        //@inject("CarsRepository")
        private carsRepository: ICarsRepository,

        private specificationsRepository: ISpecificationRepository

    ) { }

    async execute({ car_id, specifications_id }: IRequest): Promise<void> {

        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppError("Car not found");
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id);

        carExists.specifications = specifications;

        await this.carsRepository.create(carExists);


    }
}

export { CreateCarSpecificationUseCase }