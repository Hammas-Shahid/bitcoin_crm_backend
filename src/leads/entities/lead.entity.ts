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
  OneToMany,
} from 'typeorm';
import { LeadContact } from '../lead-contacts/entities/lead-contact.entity';

@Entity()
export class Lead extends BasicEntity {
  @Column()
  businessName: string;

  @Column()
  businessTypeId: number;

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
  statusId: number;

  @ManyToOne(() => BusinessType, { nullable: false })
  businessType: BusinessType;

  @ManyToOne(() => Status, { nullable: false })
  status: Status;

  @OneToMany(() => LeadContact, (lc) => lc.lead)
  leadContacts: LeadContact[];
}
