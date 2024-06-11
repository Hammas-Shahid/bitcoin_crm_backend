import { BasicEntity } from 'src/shared/entities/base-entity';
import { Status } from 'src/statuses/entities/status.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class State extends BasicEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Status, (status) => status.state)
  statuses: Status[];
}
