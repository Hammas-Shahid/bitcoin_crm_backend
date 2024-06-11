import { BusinessType } from 'src/business-types/entities/business-type.entity';
import { Contact } from 'src/contacts/entities/contact.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { Status } from 'src/statuses/entities/status.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Lead extends BasicEntity {
  @Column()
  businessName: string;

  @Column()
  businessTypeId: number;

  @ManyToOne(() => BusinessType, { nullable: false })
  businessType: BusinessType;

  @Column({ unique: true })
  address: string;

  @Column()
  city: string;

  state: string;

  @Column()
  zipCode: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  assigneeId: number;

  @ManyToOne(() => User, { nullable: false })
  assignee: User;

  @Column()
  legalName: string;

  @Column()
  legalType: string;

  @Column()
  statusId: number;

  @ManyToOne(() => Status, { nullable: false })
  status: Status;

  @ManyToMany(() => Contact, (contact) => contact.leads)
  contacts: Contact[];
}
