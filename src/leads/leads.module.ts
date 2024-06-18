import { Module } from '@nestjs/common';
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

@Module({
  imports: [TypeOrmModule.forFeature([Lead]), LeadCallsModule, ContactsModule, LeadContactsModule, LeadCallbacksModule, LeadNotesModule, SaleNotesModule],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
