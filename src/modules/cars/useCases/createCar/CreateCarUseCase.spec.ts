import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("should create a car", async () => {
        const car = await createCarUseCase.execute({
            name: "Uno",
            brand: "Fiat",
            description: "Fiat Uno",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 10,
            category_id: "category"
        });

        expect(car).toHaveProperty('id');

    });

    it("should not create a car with the same license plate", async () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Uno",
                brand: "Fiat",
                description: "Fiat Uno",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 10,
                category_id: "category"
            });

            await createCarUseCase.execute({
                name: "Uno",
                brand: "Fiat",
                description: "Fiat Uno",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 10,
                category_id: "category"
            });

        }).rejects.toEqual(new AppError('Car already exists!'));

    });

    it("should not create a car with available true by default", async () => {

        const car = await createCarUseCase.execute({
            name: "Uno",
            brand: "Fiat",
            description: "Fiat Uno",
            daily_rate: 100,
            license_plate: "ABEC-1234",
            fine_amount: 10,
            category_id: "category"
        });

        expect(car.available).toBe(true);

    });

});