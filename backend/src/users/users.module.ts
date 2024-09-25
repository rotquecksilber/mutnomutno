import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { StringSanitizerService } from './services/string-sanitizer.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, BcryptService, StringSanitizerService],
  exports: [UsersService],
})
export class UsersModule {}
