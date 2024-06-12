import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Lead } from 'src/leads/entities/lead.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { LeadContact } from 'src/leads/lead-contacts/entities/lead-contact.entity';

@Entity('contacts')
export class Contact extends BasicEntity {
  @Column()
  name: string;

  @Column({ type: 'jsonb' })
  phoneNumbers: string[];

  @Column({ type: 'jsonb' })
  emailAddresses: string[];

  @Column()
  notes: string;

  @OneToMany(() => LeadContact, (leadContact) => leadContact.contact)
  leads: LeadContact[];
}
