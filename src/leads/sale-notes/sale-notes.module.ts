import { Module } from '@nestjs/common';
import { SaleNotesService } from './sale-notes.service';
import { SaleNotesController } from './sale-notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleNote } from './entities/sale-note.entity';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports: [TypeOrmModule.forFeature([SaleNote]), NotesModule],
  controllers: [SaleNotesController],
  providers: [SaleNotesService],
})
export class SaleNotesModule {}
