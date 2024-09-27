import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WinstonModule } from 'nest-winston';
import { createWinstonConfig } from '../configs/winston.config';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ProductModule } from './products/product.module';
import { NotificationModule } from './notification/notification.module';
import { ContactsModule } from './contacts/contacts.module';
import { StoresModule } from './stores/stores.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    WinstonModule.forRoot(createWinstonConfig()),
    BcryptModule,
    UsersModule,
    AuthModule,
    ProductModule,
    NotificationModule,
    ContactsModule,
    StoresModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
