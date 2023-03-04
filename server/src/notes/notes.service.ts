import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notes } from './notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {Op, Sequelize} from "sequelize";

@Injectable()
export class NotesService {
  constructor(@InjectModel(Notes) private noteRepository: typeof Notes) {}

  async create(noteDto: CreateNoteDto): Promise<any> {
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
  async updateQueueNumber(noteDto: UpdateNoteDto[]): Promise<void> {
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
  async getNotes(tag: string): Promise<Notes[]> {
    let notes: Notes[];
    if (tag === '') {
      notes = await this.noteRepository.findAll({
        where: {
          deletedAt: null,
        },
        order: [['queueNumber', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      });
    } else {
      notes = await this.noteRepository.findAll({
        where: {
          tags: { [Op.contains]: [`#${tag}`] },
        },
        order: [['queueNumber', 'ASC']],
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
      });
    }
    return notes;
  }
  async delete(id: number): Promise<boolean> {
    const deletedNote = await this.noteRepository.destroy({
      where: {
        id,
      },
    });
    return !!deletedNote;
  }
}
