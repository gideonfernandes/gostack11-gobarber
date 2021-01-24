import { Router } from 'express';
import multer from 'multer';
import { getRepository } from 'typeorm';

import uploadConfig from '../config/upload';
import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import usersView from '../views/usersView';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const userRouter = Router();
const upload = multer(uploadConfig);

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

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      return response.json({ user: usersView.render(user) });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

export default userRouter;
