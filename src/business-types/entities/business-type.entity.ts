import { Lead } from 'src/leads/entities/lead.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class BusinessType extends BasicEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Lead, (lead) => lead.businessType)
  leads: Lead[];

  @ManyToOne(() => User, (user) => user.businessTypes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by' })
  user: User;
}
