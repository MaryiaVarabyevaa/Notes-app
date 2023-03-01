import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Notes } from './notes.entity';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}
  @Get()
  getNotes(): Promise<Notes[]> {
    return this.notesService.getNotes();
  }

  @Post('create')
  addNote(@Body() noteDto: CreateNoteDto): Promise<number> {
    return this.notesService.create(noteDto);
  }

  @Put('update')
  updateNoteInfo(@Body() noteDto: UpdateNoteDto) {
    return this.notesService.update(noteDto);
  }

  @Delete('delete')
  deleteNote(@Request() req) {
    return this.notesService.delete(req.body.id);
  }

  @Put('update-order')
  updateOrder(@Body() noteDto: UpdateNoteDto[]): Promise<void> {
    return this.notesService.updateOrder(noteDto);
  }
}
