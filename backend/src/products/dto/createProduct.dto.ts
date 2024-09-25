import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly number: number;

  @IsNumber()
  readonly price: number;

  @IsOptional() // Поле не обязательно
  @IsNumber()
  readonly discount?: number;

  @IsArray()
  @IsString({ each: true })
  readonly composition: string[];

  @IsArray()
  @IsString({ each: true })
  readonly size: string[];

  @IsArray()
  @IsString({ each: true })
  readonly color: string[];

  @IsNumber()
  readonly year: number;

  @IsString()
  readonly description1: string;

  @IsOptional()
  @IsString()
  readonly description2?: string;

  @IsOptional()
  @IsString()
  readonly description3?: string;

  @IsArray()
  @IsString({ each: true })
  readonly picture: string[];

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
