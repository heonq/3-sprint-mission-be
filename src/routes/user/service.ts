import UserRepository from '../../repositories/userRepository';
import User from '../../models/user';
import { AUTH_MESSAGES } from '../../constants/authMessages';
import { UnauthorizedException } from '../../core/errors/unauthorizedException';
import { NotFoundException } from '../../core/errors';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getMe(userId: number) {
    const userEntity = await this.userRepository.findById(userId);
    if (!userEntity) throw new NotFoundException(AUTH_MESSAGES.emailNotExist);

    return new User(userEntity);
  }
}
