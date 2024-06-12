import { Lead } from 'src/leads/entities/lead.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { State } from 'src/states/entities/state.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('statuses')
export class Status extends BasicEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  stateId: number;

  @ManyToOne(() => State, (state) => state.statuses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  state: State;

  @OneToMany(() => Lead, (lead) => lead.statusId)
  lead: Lead;

  @ManyToOne(() => User, (user) => user.statuses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by' })
  user: User;
}
