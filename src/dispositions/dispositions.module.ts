import { Module } from '@nestjs/common';
import { DispositionsService } from './dispositions.service';
import { DispositionsController } from './dispositions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disposition } from './entities/disposition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disposition])],
  controllers: [DispositionsController],
  providers: [DispositionsService],
})
export class DispositionsModule {}
