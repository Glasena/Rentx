import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsuseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsuseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

        const cars = await listAvailableCarsuseCase.execute({});

    })

    it("Should be able to list all available cars by brand", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Car 02",
            description: "Car Description",
            daily_rate: 140,
            license_plate: "AUD-4032",
            fine_amount: 500,
            brand: "Car_brand_00",
            category_id: "category_id"
        })

        const cars = await listAvailableCarsuseCase.execute({
            brand: "Car_brand_00"
        });

        expect(cars).toEqual([car]);

    })

    it("Should be able to list all available cars by name", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Car 03",
            description: "Car Description",
            daily_rate: 140,
            license_plate: "AUD-4032",
            fine_amount: 500,
            brand: "Car_brand_00",
            category_id: "category_id"
        })

        const cars = await listAvailableCarsuseCase.execute({
            name: "Car 03"
        });

        expect(cars).toEqual([car]);

    })

    it("Should be able to list all available cars by category", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Car 03",
            description: "Car Description",
            daily_rate: 140,
            license_plate: "AUD-4032",
            fine_amount: 500,
            brand: "Car_brand_00",
            category_id: "12345"
        })

        const cars = await listAvailableCarsuseCase.execute({
            category_id: "12345"
        });

        expect(cars).toEqual([car]);

    })

})