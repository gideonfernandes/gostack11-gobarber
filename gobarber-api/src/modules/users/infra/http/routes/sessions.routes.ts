import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import usersView from '@modules/users/infra/views/usersView';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return response.json({ user: usersView.render(user), token });
});

export default sessionsRouter;
