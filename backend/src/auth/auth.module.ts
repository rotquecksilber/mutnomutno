import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { LocalGuard } from './guards/local.guard';
import { AuthController } from './auth.controller';
import { BcryptModule } from '../bcrypt/bcrypt.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    BcryptModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10d' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, LocalGuard],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
