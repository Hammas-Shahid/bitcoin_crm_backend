import { LeadCall } from 'src/leads/lead-calls/entities/lead-call.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('dispositions')
export class Disposition extends BasicEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => LeadCall, (leadCall) => leadCall.disposition)
  leadCalls: LeadCall[];

  @ManyToOne(() => User, (user) => user.dispositions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by' })
  user: User;
}
