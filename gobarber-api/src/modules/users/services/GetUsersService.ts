import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class GetUsersService {
  constructor(
    @inject('UsersRepository')
    private UsersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.UsersRepository.findAll();

    return users;
  }
}

export default GetUsersService;
