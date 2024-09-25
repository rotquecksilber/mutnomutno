import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interface/product.interface';
import { CreateProductDto } from './dto/createProduct.dto';
import { ServerException } from '../errors/server.exception';
import { ErrorCode } from '../errors/error-codes';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<Product>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async updateProduct(
    number: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(number);
    return await this.productModel
      .findByIdAndUpdate(product._id, updateProductDto, {
        new: true,
        runValidators: true,
      })
      .exec();
  }

  async findOne(@Param('number') number: string): Promise<Product> {
    const product = await this.productModel.findOne({ number });
    if (!product) {
      throw new ServerException(ErrorCode.NumberNotFound);
    }
    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async deleteProduct(@Param('number') number: string): Promise<void> {
    console.log('Deleting product with number:', number);
    await this.productModel.findOneAndDelete({ number }).exec();
  }
}
