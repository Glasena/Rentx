import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}


class CreateRentalUseCase {

    constructor(
        private rentalsRepository: IRentalsRepository
    ) {};

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {

        const minHour = 24;

        // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carUnavailable) {
            throw new AppError(" Car is Unavailable !")
        }

        // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if (rentalOpenToUser) {
            throw new AppError(" There is a Rental In Progress to User !")
        }

        //O Aluguel deve ter duração mínima de 24 horas
        const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format();
        const dateNow = dayjs().utc().local().format();
        const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours")

        if( compare < minHour){
            throw new AppError("Invalid return time !");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        })

        return rental;


    };
}

export { CreateRentalUseCase }