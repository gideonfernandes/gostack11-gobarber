import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetUsersService from '@modules/users/services/GetUsersService';
import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import usersView from '@modules/users/infra/views/usersView';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getUsersService = container.resolve(GetUsersService);

    const users = await getUsersService.execute();

    return response.json({
      users: usersView.renderList(users),
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json({ user: usersView.render(user) });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute(id);

    return response.json({ message: 'User deleted successfully!' });
  }
}
