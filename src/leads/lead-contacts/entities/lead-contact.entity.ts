import { Contact } from 'src/contacts/entities/contact.entity';
import { Lead } from 'src/leads/entities/lead.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class LeadContact extends BasicEntity {
  @Column()
  leadId: number;

  @Column()
  contactId: number;

  @ManyToOne(() => Lead, (lead) => lead.leadContacts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  lead: Lead;

  @ManyToOne(() => Contact, (contact) => contact.leads, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  contact: Contact;
}
