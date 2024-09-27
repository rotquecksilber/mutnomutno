import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ContactSchema } from './schema/contact.schema';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Contact', schema: ContactSchema }]),
    NotificationModule,
  ],
  providers: [ContactsService],
  controllers: [ContactsController],
})
export class ContactsModule {}
