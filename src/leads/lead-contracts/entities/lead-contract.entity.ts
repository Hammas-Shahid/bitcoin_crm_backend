import { Lead } from 'src/leads/entities/lead.entity';
import { ServiceProvider } from 'src/service-providers/entities/service-provider.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class LeadContract extends BasicEntity {
  @Column()
  rate: string;

  @Column()
  durationInDays: number;

  @Column()
  signedDate: string;

  @Column()
  scheduleDate: string;

  @Column()
  installationDate: string;

  @Column()
  leadId: number;

  @Column()
  serviceProviderId: number;

  @ManyToOne(() => ServiceProvider, (sp) => sp.contract, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  serviceProvider: ServiceProvider;

  @OneToOne(() => Lead, (lead) => lead.leadContract, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'leadId' })
  lead: Lead;
}
