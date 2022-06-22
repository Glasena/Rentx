import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsuseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsuseCase = new ListCarsUseCase(carsRepositoryInMemory);
    })

    it("Should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Car 01",
            description: "Car Description",
            daily_rate: 140,
            license_plate: "AUD-4032",
            fine_amount: 500,
            brand: "Car_brand",
            category_id: "category_id"
        })

        const cars = await listCarsuseCase.execute({});

    })

    it("Should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Car 01",
            description: "Car Description",
            daily_rate: 140,
            license_plate: "AUD-4032",
            fine_amount: 500,
            brand: "Car_brand_00",
            category_id: "category_id"
        })

        const cars = await listCarsuseCase.execute({
            brand: "Car_brand_00"
        });

        expect(cars).toEqual([car]);

    })

})