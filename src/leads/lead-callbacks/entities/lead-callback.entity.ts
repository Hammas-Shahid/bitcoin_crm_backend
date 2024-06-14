import { Lead } from 'src/leads/entities/lead.entity';
import { Note } from 'src/notes/entities/note.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class LeadCallBack extends BasicEntity {
  @Column()
  date: string;

  @Column()
  time: string;


  @Column()
  leadId: number;

  @Column({nullable: true})
  noteId: number;

  @OneToOne(() => Note, (note) => note.note, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  note: Note;

  @ManyToOne(() => Lead, (lead) => lead.leadCallBacks, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  lead: Lead;
}
