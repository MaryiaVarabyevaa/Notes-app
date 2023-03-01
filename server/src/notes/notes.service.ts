import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notes } from './notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Notes) private noteRepository: typeof Notes) {}

  async create(noteDto: CreateNoteDto): Promise<number> {
    const note = await this.noteRepository.create(noteDto);
    return note.id;
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
  async updateOrder(noteDto: UpdateNoteDto[]): Promise<void> {
    for (let i = 0; i < noteDto.length; i++) {
      const { id, queueNumber } = noteDto[i];
      const updatedNote = await this.noteRepository.update(
        { queueNumber },
        {
          where: { id },
        },
      );
    }
  }
  async getNotes(): Promise<Notes[]> {
    const notes = await this.noteRepository.findAll({
      where: {
        deletedAt: null,
      },
      order: [['queueNumber', 'ASC']],
      attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
    });
    return notes;
  }
  async delete(id: number) {
    const deletedNote = await this.noteRepository.destroy({
      where: {
        id,
      },
    });
    return deletedNote;
  }
}
