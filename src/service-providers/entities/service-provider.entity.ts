import { BasicEntity } from "src/shared/entities/base-entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class ServiceProvider extends BasicEntity{
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.businessTypes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by' })
  user: User;
}
