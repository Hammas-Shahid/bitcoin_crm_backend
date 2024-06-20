import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from '../../shared/entities/base-entity';
import { Lead } from 'src/leads/entities/lead.entity';
import { Disposition } from 'src/dispositions/entities/disposition.entity';
import { BusinessType } from 'src/business-types/entities/business-type.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { ServiceProvider } from 'src/service-providers/entities/service-provider.entity';
import { LeadCall } from 'src/leads/lead-calls/entities/lead-call.entity';
import { Note } from 'src/notes/entities/note.entity';

@Entity()
export class User extends BasicEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  role: UserRoles;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: 0 })
  failed_attempts: number;

  @OneToMany(() => Lead, (lead) => lead.assignee)
  leads: Lead[];

  @OneToMany(() => Disposition, (disposition) => disposition.user)
  dispositions: Disposition[];

  @OneToMany(() => BusinessType, (businessType) => businessType.user)
  businessTypes: BusinessType[];

  @OneToMany(() => ServiceProvider, (provider) => provider.user)
  serviceProviders: ServiceProvider[];

  @OneToMany(() => Status, (status) => status.user)
  statuses: Status[];

  @OneToMany(() => LeadCall, (leadCall) => leadCall.user)
  leadCalls: LeadCall[];

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}

export enum UserRoles {
  Admin = 'Admin',
  Agent = 'Agent',
}
