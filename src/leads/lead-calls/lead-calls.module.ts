import { Module } from '@nestjs/common';
import { LeadCallsService } from './lead-calls.service';
import { LeadCallsController } from './lead-calls.controller';

@Module({
  controllers: [LeadCallsController],
  providers: [LeadCallsService],
})
export class LeadCallsModule {}
