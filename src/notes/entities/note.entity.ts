import { Lead } from 'src/leads/entities/lead.entity';
import { LeadCallBack } from 'src/leads/lead-callbacks/entities/lead-callback.entity';
import { LeadCall } from 'src/leads/lead-calls/entities/lead-call.entity';
import { LeadNote } from 'src/leads/lead-notes/entities/lead-note.entity';
import { SaleNote } from 'src/leads/sale-notes/entities/sale-note.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Note extends BasicEntity {
  @Column()
  content: string;

  @OneToOne(() => LeadCall, (leadCall) => leadCall.comment, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  leadCall: LeadCall;

  @OneToOne(() => LeadCallBack, (leadCallBack) => leadCallBack.comment, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  leadCallBack: LeadCallBack;

  @OneToOne(() => LeadNote, (leadNote) => leadNote.note, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  leadNote: LeadNote;

  @OneToOne(() => SaleNote, (saleNote) => saleNote.note, {
    nullable: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  saleNote: SaleNote;

  @ManyToOne(() => User, (user) => user.notes)
  @JoinColumn({ name: 'created_by' })
  user: User;
}
