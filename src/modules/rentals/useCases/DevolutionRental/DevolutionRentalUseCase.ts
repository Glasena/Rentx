import { ICarsRepository } from '@modules/cars/repositories/in-memory/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject } from "tsyringe";

interface IRequest {
    id: string;
    user_id: string;
}

class DevolutionRentalUseCase {
    
    constructor(        
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) {};

    async execute({ id, user_id}: IRequest): Promise<Rental> {
    
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(id);


        if(!rental) {
            throw new AppError("Rental does not exists !");
        }

        // Verificar o tempo de aluguel
        const dateNow = this.dateProvider.dateNow();

        // Busca a quantidade de dias na diária.
        let daily = this.dateProvider.compareInDays(rental.start_date, this.dateProvider.dateNow())

        // Caso seja inferior a um dia, considera como 1 dia
        if(daily <= 0) {
            daily = 1;
        }

        const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date);

        let total = 0;

        // Se teve atraso
        if (delay > 0){
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        // Realiza o update
        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(car.id, true);

        return rental;
    
    }

}

export { DevolutionRentalUseCase }