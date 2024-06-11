import { Lead } from 'src/leads/entities/lead.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class BusinessType extends BasicEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Lead, (lead) => lead.businessTypeId)
  lead: Lead;
}
