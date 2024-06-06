import { Column, Entity } from 'typeorm';
import { BasicEntity } from '../../shared/entities/base-entity';
import { IsEmail } from 'class-validator';

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
}

export enum UserRoles {
  Admin = 'Admin',
  Agent = 'Agent',
}
1;
