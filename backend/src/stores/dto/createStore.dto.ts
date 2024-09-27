import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsString()
  readonly link: string;
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
