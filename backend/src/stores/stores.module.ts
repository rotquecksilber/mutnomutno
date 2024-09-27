import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { StoreSchema } from './schema/store.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }]),
  ],
  providers: [StoresService],
  controllers: [StoresController],
})
export class StoresModule {}
