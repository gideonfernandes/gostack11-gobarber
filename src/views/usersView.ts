import User from '../models/User';

interface ResponseDTO {
  id: string;
  name: string;
  email: string;
}

export default {
  render(user: User): ResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
};
