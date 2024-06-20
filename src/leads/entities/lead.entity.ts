import { BusinessType } from 'src/business-types/entities/business-type.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { Status } from 'src/statuses/entities/status.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { LeadContact } from '../lead-contacts/entities/lead-contact.entity';
import { LeadCall } from '../lead-calls/entities/lead-call.entity';
import { LeadCallBack } from '../lead-callbacks/entities/lead-callback.entity';
import { LeadNote } from '../lead-notes/entities/lead-note.entity';
import { SaleNote } from '../sale-notes/entities/sale-note.entity';
import { LeadContract } from '../lead-contracts/entities/lead-contract.entity';

@Entity()
export class Lead extends BasicEntity {
  @Column()
  businessName: string;

  @Column()
  businessTypeId: number;

  @Column({ unique: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  assigneeId: number;

  @Column({ nullable: true })
  statusId: number;

  @Column({ type: 'jsonb', nullable: true })
  saleInfo: SaleInfo;

  @ManyToOne(() => User, (assignee) => assignee.leads, {
    nullable: false,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  assignee: User;

  @OneToMany(() => LeadCall, (leadCall) => leadCall.lead)
  leadCalls: LeadCall[];

  @OneToMany(() => LeadCallBack, (leadCallBack) => leadCallBack.lead)
  leadCallBacks: LeadCallBack[];

  @ManyToOne(() => BusinessType, (businessType) => businessType.leads, {
    nullable: false,
  })
  businessType: BusinessType;

  @ManyToOne(() => Status, (status) => status.leads, { nullable: false })
  status: Status;

  @OneToMany(() => LeadContact, (lc) => lc.lead)
  leadContacts: LeadContact[];

  @OneToMany(() => LeadNote, (ln) => ln.lead)
  leadNotes: LeadNote[];

  @OneToMany(() => SaleNote, (sn) => sn.sale)
  saleNotes: SaleNote[];

  @OneToOne(() => LeadContract, (lc) => lc.lead)
  leadContract: LeadContract;
}

export interface SaleInfo {
  dateSaleMade: string;
  saleMadeById: number;
  saleMadeByUser: User;
}
