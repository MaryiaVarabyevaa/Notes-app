import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}
  @Get()
  getNotes() {
    return this.notesService.getNotes();
  }

  @Post('create')
  addNote(@Body() noteDto: CreateNoteDto) {
    return this.notesService.create(noteDto);
  }

  @Put('update')
  updateNoteInfo(@Body() noteDto: UpdateNoteDto) {
    return this.notesService.update(noteDto);
  }

  @Delete()
  deleteNote() {
    return '';
  }
}
