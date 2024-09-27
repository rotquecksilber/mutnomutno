import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/createContact.dto';
import { Contact } from './interface/contact.interface';
import { AddNoteDto } from './dto/addNote.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async createContact(@Body() createContactDto: CreateContactDto) {
    return await this.contactsService.createContact(createContactDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllContacts(): Promise<Contact[]> {
    return await this.contactsService.getAllContacts();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getContactById(@Param('id') _id: number): Promise<Contact> {
    return await this.contactsService.getContactById(_id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteContactById(@Param('id') _id: number): Promise<void> {
    await this.contactsService.deleteContactById(_id);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async addNote(
    @Param('id') _id: number,
    @Body('note') addNoteDto: AddNoteDto,
  ): Promise<void> {
    await this.contactsService.addNote(_id, addNoteDto);
  }
}
