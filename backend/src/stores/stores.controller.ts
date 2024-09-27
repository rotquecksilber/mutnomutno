import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/createStore.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UpdateStoreDto } from './dto/updateStore.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storeService: StoresService) {}

  @Get()
  async getStores() {
    return await this.storeService.getStores();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createStore(@Body() createStoreDto: CreateStoreDto) {
    return await this.storeService.createStore(createStoreDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateStore(
    @Param('id') _id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return await this.storeService.updateStore(_id, updateStoreDto);
  }
}
