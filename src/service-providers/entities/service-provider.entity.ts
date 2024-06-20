import { LeadContract } from 'src/leads/lead-contracts/entities/lead-contract.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ServiceProvider extends BasicEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => LeadContract, (c) => c.serviceProvider, { nullable: true })
  contract: LeadContract;

  @ManyToOne(() => User, (user) => user.serviceProviders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by' })
  user: User;
}
