import { getRepository } from 'typeorm';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/in-memory/ICarsRepository';
import { Repository } from 'typeorm';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        specifications
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            specifications
        });

        await this.repository.save(car);

        return car;

    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });

        return car;

    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {

        const carsQuery = await this.repository.createQueryBuilder("c").where("available = :available", { available: true })

        if (brand) {
            carsQuery.andWhere("brand = :brand", { brand });
        }

        if (name) {
            carsQuery.andWhere("name = :name", { name });
        }

        if (category_id) {
            carsQuery.andWhere("category_id = :category_id", { category_id });
        }

        const cars = await carsQuery.getMany();

        return cars

    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }



}

export { CarsRepository };