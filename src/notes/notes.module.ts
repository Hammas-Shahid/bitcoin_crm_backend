import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadCall } from 'src/leads/lead-calls/entities/lead-call.entity';
import { LeadCallBack } from 'src/leads/lead-callbacks/entities/lead-callback.entity';
import { Lead } from 'src/leads/entities/lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Lead, LeadCall, LeadCallBack])],
  controllers: [NotesController],
  providers: [NotesService],

})
export class NotesModule {}
