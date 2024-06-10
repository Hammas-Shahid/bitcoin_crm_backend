import { BasicEntity } from 'src/shared/entities/base-entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class State extends BasicEntity {
  @Column({ unique: true })
  name: string;
}
