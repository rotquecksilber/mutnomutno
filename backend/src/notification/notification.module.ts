import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()], // Подключаем ConfigModule
  providers: [NotificationService],
  exports: [NotificationService], // Экспортируем NotificationService для использования в других модулях
})
export class NotificationModule {}
