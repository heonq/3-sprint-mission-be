import { EXCEPTION_MESSAGES } from '@/constants/exceptionMessages';
import { ConflictException } from '@/core/errors';
import UserRepository from '../../user/repository/userRepository';
import { SignInRequest, SignUpRequest } from '@/structs/authStruct';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateTokens } from '@/core/security/jwt';
import User from '@/routes/user/model/user';
import { UnauthorizedException } from '@/core/errors/unauthorizedException';
import { AUTH_MESSAGES } from '@/constants/authMessages';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class AuthService {
  private refreshTokenSecret: string;

  private SALT_ROUNDS = 10;

  constructor(
    private userRepository: UserRepository,
    refreshTokenSecret: string,
  ) {
    this.refreshTokenSecret = refreshTokenSecret;
  }

  async signUp({ email, nickname, password }: SignUpRequest) {
    const existingUserByEmail = await this.userRepository.findByEmail(email);
    if (existingUserByEmail) throw new ConflictException(EXCEPTION_MESSAGES.duplicatedEmail);
    const existingUserByNickname = await this.userRepository.findByNickname(nickname);
    if (existingUserByNickname) throw new ConflictException(EXCEPTION_MESSAGES.duplicatedNickname);

    const encryptedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
    const userEntity = await this.userRepository.create({
      email,
      nickname,
      encryptedPassword,
    });
    const user = new User(userEntity);
    const tokens = generateTokens(user.getId());

    return {
      ...tokens,
      user,
    };
  }

  async signIn({ email, password }: SignInRequest) {
    const userEntity = await this.userRepository.findByEmail(email);
    if (!userEntity) throw new UnauthorizedException(AUTH_MESSAGES.emailNotExist);

    const isPasswordValid = await bcrypt.compare(password, userEntity?.encryptedPassword);
    if (!isPasswordValid) throw new UnauthorizedException(AUTH_MESSAGES.invalidPassword);

    const user = new User(userEntity);
    const tokens = generateTokens(user.getId());

    return {
      ...tokens,
      user,
    };
  }

  async refreshUserToken(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException(AUTH_MESSAGES.needRefreshToken);

    try {
      const decoded = jwt.verify(refreshToken, this.refreshTokenSecret) as JwtPayload;
      return generateAccessToken(decoded.userId);
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError)
        throw new UnauthorizedException(AUTH_MESSAGES.refreshTokenExpired);

      throw new UnauthorizedException(AUTH_MESSAGES.invalidRefreshToken);
    }
  }
}
