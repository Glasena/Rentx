import { Response, Request } from 'express';
import { container, injectable } from 'tsyringe';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

@injectable()
class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {

        const { id } = request.params;
        const { specifications_id } = request.body;

        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

        const cars = await createCarSpecificationUseCase.execute({
            car_id: id,
            specifications_id
        })

        return response.json(cars);

    }
}

export { CreateCarSpecificationController };