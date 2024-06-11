import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { State } from 'src/states/entities/state.entity';
import { StatusesController } from './statuses.controller';
import { StatesService } from 'src/states/states.service';
import { StatesModule } from 'src/states/states.module';

@Module({
  imports: [TypeOrmModule.forFeature([Status]), StatesModule],
  controllers: [StatusesController],
  providers: [StatusesService],
  exports: [StatusesService],
})
export class StatusesModule {}
