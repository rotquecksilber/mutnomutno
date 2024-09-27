import { IsString, IsEmail } from 'class-validator';

export class CreateContactDto {
  @IsString()
  readonly name: string;
  @IsEmail()
  @IsString()
  readonly email: string;
  @IsString()
  readonly tg: string;
  @IsString()
  readonly comment: string;
}
