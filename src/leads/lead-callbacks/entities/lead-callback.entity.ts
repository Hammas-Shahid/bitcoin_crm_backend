import { Lead } from 'src/leads/entities/lead.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class LeadCallBack extends BasicEntity {
  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  comment: string;

  @Column()
  leadId: number;

  @ManyToOne(() => Lead, (lead) => lead.leadCallBacks, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  lead: Lead;
}
