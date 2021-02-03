import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private UsersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<void> {
    await this.UsersRepository.delete(user_id);
  }
}

export default DeleteUserService;
