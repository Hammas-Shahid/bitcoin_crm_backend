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
  OneToOne,
} from 'typeorm';
import { LeadContact } from '../lead-contacts/entities/lead-contact.entity';
import { LeadCall } from '../lead-calls/entities/lead-call.entity';
import { LeadCallBack } from '../lead-callbacks/entities/lead-callback.entity';
import { LeadContract } from '../lead-contracts/entities/lead-contract.entity';

@Entity()
export class Lead extends BasicEntity {
  @Column()
  businessName: string;

  @Column({nullable: true})
  businessTypeId: number;

  @Column({ unique: true })
  address: string;

  @Column({nullable: true})
  city: string;

  @Column({nullable: true})
  state: string;

  @Column({nullable: true})
  zipCode: string;

  @Column()
  phoneNumber: string;

  @Column({nullable: true})
  email: string;

  @Column({nullable: true})
  assigneeId: number;

  @Column({nullable: true})
  statusId: number;
  
  @Column({nullable: true})
  saleMadeById: number;
  
  @ManyToOne(() => User, { nullable: true })
  saleMadeBy: User;

  @ManyToOne(() => User, { nullable: false })
  assignee: User;

  @OneToMany(() => LeadCall, (leadCall) => leadCall.lead)
  leadCalls: LeadCall[];

  @OneToMany(() => LeadCallBack, (leadCallBack) => leadCallBack.lead)
  leadCallBacks: LeadCallBack[];

  @ManyToOne(() => BusinessType, { nullable: false })
  businessType: BusinessType;

  @ManyToOne(() => Status, { nullable: false })
  status: Status;

  @OneToMany(() => LeadContact, (lc) => lc.lead)
  leadContacts: LeadContact[];

  @OneToOne(() => LeadContract, leadContract => leadContract.lead)
  leadContract: LeadContract;
}