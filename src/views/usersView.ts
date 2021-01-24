import User from '../models/User';

interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
}

export default {
  render(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },

  renderList(users: User[]): UserResponseDTO[] {
    return users.map(user => this.render(user));
  },
};
