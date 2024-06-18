import { LeadCallBack } from "src/leads/lead-callbacks/entities/lead-callback.entity";
import { LeadCall } from "src/leads/lead-calls/entities/lead-call.entity";
import { BasicEntity } from "src/shared/entities/base-entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Note extends BasicEntity{
@Column()
content: string;

@OneToOne(()=> LeadCall, leadCall=> leadCall.comment, {nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
leadCall: LeadCall

@OneToOne(()=> LeadCallBack, leadCallBack=> leadCallBack.comment, {nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
leadCallBack: LeadCallBack
}
