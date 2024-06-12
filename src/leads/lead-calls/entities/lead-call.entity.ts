import { Disposition } from 'src/dispositions/entities/disposition.entity';
import { Lead } from 'src/leads/entities/lead.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class LeadCall extends BasicEntity {
  @Column()
  duration: string;

  @Column()
  comment: string;

  @Column()
  dispositionId: number;

  @Column()
  leadId: number;

  @ManyToOne(() => Lead, { nullable: false })
  lead: Lead;

  @ManyToOne(() => Disposition, { nullable: false })
  callDisposition: Disposition;
}
