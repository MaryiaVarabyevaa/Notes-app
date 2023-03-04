import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  getNotes(@Request() req): Promise<Notes[]> {
    return this.notesService.getNotes(req.body.tag);
  }

  @Post('create')
  addNote(@Body() noteDto: CreateNoteDto): Promise<Notes> {
    return this.notesService.create(noteDto);
  }

  @Put('update')
  updateNoteInfo(@Body() noteDto: UpdateNoteDto) {
    return this.notesService.update(noteDto);
  }

  @Delete('delete')
  deleteNote(@Request() req): Promise<boolean> {
    return this.notesService.delete(req.body.id);
  }

  @Put('update-order')
  updateOrder(@Body() noteDto: UpdateNoteDto[]): Promise<void> {
    return this.notesService.updateQueueNumber(noteDto);
  }
}
