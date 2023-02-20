import { IUserResponseDTO } from '@modules/accounts/dtos/iUserResponseDTO';
import { UserMap } from '@modules/accounts/mapper/UserMap';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ProfileUserUseCase {
    
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    
    async execute(id: string): Promise<IUserResponseDTO> {
        const user = await this.usersRepository.findById(id);
        return UserMap.toDTO(user);
    }
}

export { ProfileUserUseCase }