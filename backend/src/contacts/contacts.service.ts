import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './interface/contact.interface';
import { CreateContactDto } from './dto/createContact.dto';
import { AddNoteDto } from './dto/addNote.dto';

import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel('Contact')
    private readonly contactModel: Model<Contact>,
    private notificationService: NotificationService,
  ) {}

  async createContact(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = await this.contactModel.create(createContactDto);
    // Формирование сообщения для отправки в Telegram
    const message = `Новый контакт:
    Имя: ${createContactDto.name}
    Email: ${createContactDto.email}
    Telegram: @${createContactDto.tg}
    Комментарий: ${createContactDto.comment}`;

    // Отправка сообщения в Telegram
    await this.notificationService.sendToTelegram(message);
    return contact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.contactModel.find().exec();
  }

  async getContactById(_id: number): Promise<Contact> {
    return await this.contactModel.findOne({ _id }).exec();
  }

  async deleteContactById(_id: number): Promise<void> {
    await this.contactModel.findByIdAndDelete({ _id }).exec();
  }

  async addNote(_id: number, addNoteDto: AddNoteDto): Promise<void> {
    await this.contactModel.findByIdAndUpdate(
      _id, // Идентификатор записи
      { $set: { addNoteDto } }, // Обновление поля 'note'
    );
  }
}
