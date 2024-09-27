import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Store } from './interface/store.interface';
import { CreateStoreDto } from './dto/createStore.dto';
import { UpdateStoreDto } from './dto/updateStore.dto';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel('Store')
    private readonly storeModel: Model<Store>,
  ) {}

  async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
    return await this.storeModel.create(createStoreDto);
  }

  async updateStore(
    _id: string,
    updateStoreDto: UpdateStoreDto,
  ): Promise<Store | null> {
    return await this.storeModel
      .findByIdAndUpdate(_id, updateStoreDto, { new: true })
      .exec();
  }

  async getStores(): Promise<Store[]> {
    return await this.storeModel.find().exec();
  }
}
