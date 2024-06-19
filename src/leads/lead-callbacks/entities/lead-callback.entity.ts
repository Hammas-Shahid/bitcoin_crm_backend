import { Lead } from 'src/leads/entities/lead.entity';
import { Note } from 'src/notes/entities/note.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class LeadCallBack extends BasicEntity {
  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  leadId: number;

  @ManyToOne(() => Lead, (lead) => lead.leadCallBacks, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  lead: Lead;

  @Column({nullable: true})
  commentId: number;

  @OneToOne(()=> Note, note=> note.leadCallBack)
  @JoinColumn()
  comment: Note;
}
