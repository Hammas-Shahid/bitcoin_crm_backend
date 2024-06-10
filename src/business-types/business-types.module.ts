import { Module } from '@nestjs/common';
import { BusinessTypesService } from './business-types.service';
import { BusinessTypesController } from './business-types.controller';
import { BusinessType } from './entities/business-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessType])],
  controllers: [BusinessTypesController],
  providers: [BusinessTypesService],
  exports: [BusinessTypesService],
})
export class BusinessTypesModule {}
