import { BeforeInsert, Column, Entity } from 'typeorm';
import { BasicEntity } from '../../shared/entities/base-entity';

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
}

export enum UserRoles {
  Admin = 'Admin',
  Agent = 'Agent',
}
1;
