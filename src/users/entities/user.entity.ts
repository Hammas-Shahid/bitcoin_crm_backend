import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BasicEntity } from '../../shared/entities/base-entity';
import { Lead } from 'src/leads/entities/lead.entity';

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
  lead: Lead;
}

export enum UserRoles {
  Admin = 'Admin',
  Agent = 'Agent',
}
1;
