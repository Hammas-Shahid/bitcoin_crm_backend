import { Module } from '@nestjs/common';
import { LeadNotesService } from './lead-notes.service';
import { LeadNotesController } from './lead-notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadNote } from './entities/lead-note.entity';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports: [TypeOrmModule.forFeature([LeadNote]), NotesModule],
  controllers: [LeadNotesController],
  providers: [LeadNotesService],
})
export class LeadNotesModule {}
