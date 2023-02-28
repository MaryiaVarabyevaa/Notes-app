import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notes } from './notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Notes) private noteRepository: typeof Notes) {}

  async create(noteDto: CreateNoteDto) {
    const note = await this.noteRepository.create(noteDto);
    return note;
  }
  async update(noteDto: UpdateNoteDto) {
    const { id, ...rest } = noteDto;
    const note = await this.noteRepository.findOne({
      where: { id },
    });
    if (!note) {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: 'There is no such note',
        },
        HttpStatus.OK,
      );
    }
    const updatedNote = await this.noteRepository.update(
      { ...rest },
      { where: { id } },
    );
    return updatedNote;
  }
  async getNotes() {
    const notes = await this.noteRepository.findAll();
    return notes;
  }
}
