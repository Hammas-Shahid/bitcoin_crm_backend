import { Module } from '@nestjs/common';
import { LeadCallbacksService } from './lead-callbacks.service';
import { LeadCallbacksController } from './lead-callbacks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadCallBack } from './entities/lead-callback.entity';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports: [TypeOrmModule.forFeature([LeadCallBack]), NotesModule],
  controllers: [LeadCallbacksController],
  providers: [LeadCallbacksService],
  exports: [LeadCallbacksService],
})
export class LeadCallbacksModule {}
