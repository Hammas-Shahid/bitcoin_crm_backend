import { Module } from '@nestjs/common';
import { LeadCallsService } from './lead-calls.service';
import { LeadCallsController } from './lead-calls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadCall } from './entities/lead-call.entity';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports: [TypeOrmModule.forFeature([LeadCall]), NotesModule],
  controllers: [LeadCallsController],
  providers: [LeadCallsService],
  exports: [LeadCallsService],
})
export class LeadCallsModule {}
