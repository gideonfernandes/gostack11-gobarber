import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findedUser = this.users.find(user => user.id === id);

    return findedUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findedUser = this.users.find(user => user.email === email);

    return findedUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findedIndex = this.users.findIndex(
      findedUser => findedUser.id === user.id,
    );

    this.users[findedIndex] = user;

    return user;
  }

  public async delete(user_id: string): Promise<void> {
    this.users.filter(user => user.id !== user_id);
  }
}

export default FakeUsersRepository;
