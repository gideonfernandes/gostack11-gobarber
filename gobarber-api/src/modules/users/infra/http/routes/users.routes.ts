import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import usersView from '@modules/users/infra/views/usersView';
import { container } from 'tsyringe';

const userRouter = Router();
const upload = multer(uploadConfig);

// userRouter.get('/', ensureAuthenticated, async (request, response) => {
//   const usersRepository = getRepository(User);
//   const users = await usersRepository.find();

//   return response.json({ users: usersView.renderList(users) });
// });

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  return response.json({ user: usersView.render(user) });
});

// userRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
//   const { id } = request.params;

//   await usersRepository.delete(id);

//   return response.json({ message: 'User deleted successfully!' });
// });

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    return response.json({ user: usersView.render(user) });
  },
);

export default userRouter;
