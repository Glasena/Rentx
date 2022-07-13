import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationsRepositoryInMemory implements ISpecificationRepository {

    specifications: Specification[] = [];

    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {

        const specification = new Specification();

        this.specifications.push(specification);

        return specification;



    }
    async findByName(name: string): Promise<any> {

        return this.specifications.find((specification) => specification.name === name);

    }
    async findByIds(ids: string[]): Promise<Specification[]> {

        return this.specifications.filter((specification) => ids.includes(specification.id));

    }

}

export { SpecificationsRepositoryInMemory }