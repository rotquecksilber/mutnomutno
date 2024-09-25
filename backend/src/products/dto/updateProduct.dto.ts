import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  readonly number: number;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional() // Поле не обязательно
  @IsNumber()
  readonly discount?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly composition: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly size: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly color: string[];

  @IsOptional()
  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString()
  readonly description1: string;
  @IsOptional()
  @IsString()
  readonly description2: string;
  @IsOptional()
  @IsString()
  readonly description3: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly picture: string[];

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
