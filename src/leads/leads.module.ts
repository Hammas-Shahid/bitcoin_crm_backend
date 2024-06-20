import { Module, forwardRef } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { LeadCallsModule } from './lead-calls/lead-calls.module';
import { ContactsModule } from 'src/contacts/contacts.module';
import { LeadContactsModule } from './lead-contacts/lead-contacts.module';
import { LeadCallbacksModule } from './lead-callbacks/lead-callbacks.module';
import { LeadNotesModule } from './lead-notes/lead-notes.module';
import { SaleNotesModule } from './sale-notes/sale-notes.module';
import { StatesModule } from 'src/states/states.module';
import { StatusesModule } from 'src/statuses/statuses.module';
import { LeadContractsModule } from './lead-contracts/lead-contracts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead]),
    forwardRef(() => LeadCallsModule),
    ContactsModule,
    LeadContactsModule,
    LeadCallbacksModule,
    LeadNotesModule,
    SaleNotesModule,
    StatesModule,
    StatusesModule,
    LeadContractsModule,
  ],
  controllers: [LeadsController],
  providers: [LeadsService],
  exports: [LeadsService],
})
export class LeadsModule {}
