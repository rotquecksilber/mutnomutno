import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationService {
  private readonly token: string;
  private readonly chatId: string;

  constructor(private readonly configService: ConfigService) {
    this.token = this.configService.get<string>('TELEGRAM_BOT_TOKEN_MESSAGES');
    this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID_MESSAGES'); // Обратите внимание на это
  }

  async sendToTelegram(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.token}/sendMessage`;

    try {
      await axios.post(url, {
        chat_id: this.chatId, // Используйте правильный chat_id
        text: message,
      });
    } catch (error) {
      console.error('Error sending message to Telegram:', error);
    }
  }
}
