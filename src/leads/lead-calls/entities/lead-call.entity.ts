import { Disposition } from 'src/dispositions/entities/disposition.entity';
import { Lead } from 'src/leads/entities/lead.entity';
import { Note } from 'src/notes/entities/note.entity';
import { BasicEntity } from 'src/shared/entities/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class LeadCall extends BasicEntity {
  @Column()
  duration: string;

  @Column()
  dispositionId: number;

  @Column()
  leadId: number;

  @ManyToOne(() => Lead, (lead) => lead.leadCalls, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  lead: Lead;

  @ManyToOne(
    () => Disposition,
    (callDisposition) => callDisposition.leadCalls,
    {
      nullable: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  disposition: Disposition;

  @Column({ nullable: true })
  commentId: number;

  @OneToOne(() => Note, (note) => note.leadCall)
  @JoinColumn()
  comment: Note;

  @ManyToOne(() => User, (user) => user.leadCalls)
  @JoinColumn({ name: 'created_by' })
  user: User;
}
