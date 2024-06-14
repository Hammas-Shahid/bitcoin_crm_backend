import { IsEnum, IsString } from 'class-validator';
import { Lead } from 'src/leads/entities/lead.entity';
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



    @OneToOne(() => LeadCall, leadCall => leadCall.note)
    leadCall: LeadCall;


    // @ManyToOne(()=> User, (user)=> user.notes)
    // @JoinColumn({ name: 'created_by' })
    // user: User;
}
