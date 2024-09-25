import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user.interface';
import { Model } from 'mongoose';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { StringSanitizerService } from './services/string-sanitizer.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ServerException } from '../errors/server.exception';
import { ErrorCode } from '../errors/error-codes';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly bcryptService: BcryptService,
    private readonly stringSanitizerService: StringSanitizerService,
  ) {}

  /* Уникальна ли почта */
  async isEmailUnique(email: string): Promise<boolean> {
    const existingEmail = await this.userModel.findOne({ email });
    return !existingEmail;
  }

  /* Уникально ли имя пользователя */
  async isUsernameUnique(username: string): Promise<boolean> {
    const existingUsername = await this.userModel.findOne({
      username,
    });
    return !existingUsername;
  }

  /* Создание нового пользователя */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, username, ...rest } = createUserDto;

    const lowercaseEmail = this.stringSanitizerService.toLowerCase(email);
    const lowercaseUsername = this.stringSanitizerService.toLowerCase(username);

    // Проверим уникальность username и email
    if (!(await this.isEmailUnique(lowercaseEmail))) {
      throw new ServerException(ErrorCode.EmailTaken);
    }
    // Проверим уникальность username и email
    if (!(await this.isUsernameUnique(lowercaseUsername))) {
      throw new ServerException(ErrorCode.UsernameTaken);
    }

    // Хешируем пароль
    const hashedPassword = await this.bcryptService.hashPassword(password);

    return await this.userModel.create({
      email: lowercaseEmail,
      username: lowercaseUsername,
      ...rest,
      password: hashedPassword,
    });
  }

  /* Найти пользователя по id */
  async findOne(_id: number): Promise<User> {
    const user = await this.userModel.findOne({ _id });
    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }
    return user;
  }

  /* Найти пользователя по username */
  async findByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    }
    return user;
  }
}
