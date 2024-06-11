import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Lead } from 'src/leads/entities/lead.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';

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

  @ManyToMany(() => Lead, (lead) => lead.contacts)
  @JoinTable()
  leads: Lead[];
}
