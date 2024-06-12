import { LeadCall } from 'src/leads/lead-calls/entities/lead-call.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('dispositions')
export class Disposition extends BasicEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => LeadCall, (leaadCall) => leaadCall.dispositionId)
  leadCalls: LeadCall[];
}
