import { Module } from '@nestjs/common';
import { LeadCallsService } from './lead-calls.service';
import { LeadCallsController } from './lead-calls.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadCall } from './entities/lead-call.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeadCall])],
  controllers: [LeadCallsController],
  providers: [LeadCallsService],
  exports: [LeadCallsService],
})
export class LeadCallsModule {}
