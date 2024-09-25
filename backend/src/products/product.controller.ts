import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './interface/product.interface';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':number')
  async update(
    @Param('number') number: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.updateProduct(number, updateProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':number')
  async findOne(@Param('number') number: string): Promise<Product> {
    return await this.productService.findOne(number);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/:number')
  async delete(@Param('number') number: string): Promise<void> {
    await this.productService.deleteProduct(number);
  }
}
