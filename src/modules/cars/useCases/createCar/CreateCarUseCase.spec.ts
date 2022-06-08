import { CarsRepositoryInMemory } from "modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("should create a car", async () => {
        await createCarUseCase.execute({
            name: "Uno",
            brand: "Fiat",
            description: "Fiat Uno",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 10,
            category_id: "category"
        });
    })
});