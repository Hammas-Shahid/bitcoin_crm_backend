import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from '../../shared/entities/base-entity';
import { Lead } from 'src/leads/entities/lead.entity';
import { Disposition } from 'src/dispositions/entities/disposition.entity';
import { BusinessType } from 'src/business-types/entities/business-type.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { ServiceProvider } from 'src/service-providers/entities/service-provider.entity';

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

  @OneToMany(() => Lead, (lead) => lead.assigneeId)
  lead: Lead[];

  @OneToMany(() => Disposition, (disposition) => disposition.created_by)
  dispositions: Disposition[];

  @OneToMany(() => BusinessType, (businessType) => businessType.created_by)
  businessTypes: BusinessType[];

  @OneToMany(() => ServiceProvider, (provider) => provider.created_by)
  serviceProviders: ServiceProvider[];

  @OneToMany(() => Status, (status) => status.created_by)
  statuses: Status[];
}

export enum UserRoles {
  Admin = 'Admin',
  Agent = 'Agent',
}
