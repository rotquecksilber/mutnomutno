import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  MinLength,
  IsOptional,
} from 'class-validator';

// Определение перечисления для ролей
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole, { message: 'Role must be either admin or user' })
  @IsOptional()
  role?: UserRole; // Это опциональное значение
}
