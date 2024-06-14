import { IsEnum, IsString } from 'class-validator';
import { Lead } from 'src/leads/entities/lead.entity';
import { LeadCallBack } from 'src/leads/lead-callbacks/entities/lead-callback.entity';
import { LeadCall } from 'src/leads/lead-calls/entities/lead-call.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

export enum NoteTypes {
  Call_Note = "Call Note",
  Call_Back_Note = "Call Back Note",
  Sale_Note = "Sale Note",
  Lead_Note = "Lead Note",
}

@Entity('notes')
export class Note extends BasicEntity {
    @Column()
    note: string;
  
    @Column({
        type: 'enum',
        enum: NoteTypes,
    })
    @IsEnum(NoteTypes)
    type: NoteTypes;

    @Column({nullable:true})
    leadCallId: number;

    @Column({nullable:true})
    leadCallBackId: number;

    @Column({nullable:true})
    leadId: number

    @OneToOne(() => LeadCall, leadCall => leadCall.note, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    leadCall: LeadCall;

    @OneToOne(() => LeadCallBack, leadCallBack => leadCallBack.note)
    leadCallBack: LeadCallBack;

    @OneToOne(() => Lead, lead => lead.leadNote)
    lead: Lead;
  
    @OneToOne(() => Lead, lead => lead.saleNote)
    sale: Lead;
    
}
