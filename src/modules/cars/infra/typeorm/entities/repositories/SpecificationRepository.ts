import { getRepository, Repository } from "typeorm";

import { Specification } from "../Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../../../../repositories/ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {

    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ description, name }: ICreateSpecificationDTO): Promise<void> {

        const specification = this.repository.create({
            description,
            name
        });

        await this.repository.save(specification);


    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });
        return specification;
    }


}

export { SpecificationRepository }