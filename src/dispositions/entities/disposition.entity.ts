import { BasicEntity } from 'src/shared/entities/base-entity';
import { Entity, Column } from 'typeorm';

@Entity('dispositions')
export class Disposition extends BasicEntity {
  @Column({ unique: true })
  name: string;
}
