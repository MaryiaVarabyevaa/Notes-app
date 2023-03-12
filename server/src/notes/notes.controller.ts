import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Notes } from './notes.entity';
import { UpdateTagsDto } from './dto/update-tags.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get('')
  getNotes(@Query('tag') tag: string): Promise<Notes[]> {
    return this.notesService.getNotes(tag);
  }

  @Get('tags')
  getTags(): Promise<string[]> {
    return this.notesService.getTags();
  }

  @Put('update-tags')
  updateTags(@Body() noteDto: UpdateTagsDto) {
    return this.notesService.updateTags(noteDto);
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
