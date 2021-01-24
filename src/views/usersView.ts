import User from '../models/User';

interface UserResponseDTO {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
}

export default {
  render(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  },

  renderList(users: User[]): UserResponseDTO[] {
    return users.map(user => this.render(user));
  },
};
