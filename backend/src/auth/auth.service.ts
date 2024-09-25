import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { User } from '../users/interface/user.interface';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { ServerException } from '../errors/server.exception';
import { ErrorCode } from '../errors/error-codes';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}
  async signup(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  async auth(user: User) {
    const payload = { sub: user.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new ServerException(ErrorCode.LoginOrPasswordIncorrect);
    }

    if (!password || !user.password) {
      throw new Error('Password or user password is missing');
    }

    const isPasswordMatching = await this.bcryptService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new ServerException(ErrorCode.LoginOrPasswordIncorrect);
    }

    return user;
  }
}
