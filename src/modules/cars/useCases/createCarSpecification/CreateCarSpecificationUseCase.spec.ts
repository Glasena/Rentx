import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    });

    it("should not be able to create a car specification to a non-existent car", async () => {

        expect(async () => {

            const car_id = "1234";
            const specifications_id = ["54321"];

            await createCarSpecificationUseCase.execute({ car_id, specifications_id });

        }).rejects.toEqual(new AppError('Car not found'));

    });

    it("should be able to create a car specification", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Uno",
            brand: "Fiat",
            description: "Fiat Uno",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 10,
            category_id: "category"
        });

        const specifications_id = ["54321"];

        await createCarSpecificationUseCase.execute({ car_id: car.id, specifications_id });
    });

})