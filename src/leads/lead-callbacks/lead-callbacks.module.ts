import { Module } from '@nestjs/common';
import { LeadCallbacksService } from './lead-callbacks.service';
import { LeadCallbacksController } from './lead-callbacks.controller';

@Module({
  controllers: [LeadCallbacksController],
  providers: [LeadCallbacksService],
})
export class LeadCallbacksModule {}
