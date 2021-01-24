import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import usersView from '../views/usersView';

const userRouter = Router();

userRouter.get('/', ensureAuthenticated, async (request, response) => {
  const usersRepository = getRepository(User);
  const users = await usersRepository.find();

  return response.json({ users: usersView.renderList(users) });
});

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json({ user: usersView.render(user) });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

userRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const usersRepository = getRepository(User);
  await usersRepository.delete(id);

  return response.json({ message: 'User deleted successfully!' });
});

userRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
  return response.json({ ok: true });
});

export default userRouter;
