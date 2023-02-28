import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Notes } from './notes.entity';

@Module({
  providers: [NotesService],
  controllers: [NotesController],
  imports: [SequelizeModule.forFeature([Notes])],
})
export class NotesModule {}
