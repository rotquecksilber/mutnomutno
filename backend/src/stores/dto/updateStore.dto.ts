import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateStoreDto {
  @IsOptional()
  @IsString()
  readonly name?: string;
  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly link?: string;
  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
