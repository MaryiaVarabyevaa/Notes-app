import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notes } from './notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Op } from 'sequelize';
import { UpdateTagsDto } from './dto/update-tags.dto';

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
          tags: { [Op.contains]: [tag] },
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
  async getTags() {
    const tags = await this.noteRepository.findAll({
      attributes: ['tags'],
    });

    if (tags.length !== 0) {
      const set = new Set();
      const arr = tags
        .map(({ tags }) => tags)
        .reduce((a, b) => a.concat(b))
        .map((tag) => set.add(tag));
      return Array.from(set);
    } else {
      throw new HttpException(
        {
          status: HttpStatus.OK,
          error: 'Notes do not exist in the system',
        },
        HttpStatus.OK,
      );
    }
  }
  async updateTags(noteDto: UpdateTagsDto) {
    const { id, text, tags, date } = noteDto;
    const updatedNote = await this.noteRepository.update(
      { text, tags, date },
      { where: { id } },
    );
    return updatedNote;
  }
}
