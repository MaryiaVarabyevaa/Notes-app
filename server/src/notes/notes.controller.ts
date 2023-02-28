import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('notes')
export class NotesController {
  @Get()
  getAllNotes() {
    return 'Get all notes';
  }

  @Post()
  addNote() {
    return '';
  }

  @Put()
  updateNoteInfo() {
    return '';
  }

  @Delete()
  deleteNote() {
    return '';
  }
}
