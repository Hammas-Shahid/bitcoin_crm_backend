import { Lead } from "src/leads/entities/lead.entity";
import { Note } from "src/notes/entities/note.entity";
import { BasicEntity } from "src/shared/entities/base-entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class LeadNote extends BasicEntity{
    @Column()
    leadId: number;

    @Column()
    noteId: number;

    @ManyToOne(()=> Lead, l=> l.leadNotes, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    lead: Lead;

    @OneToOne(()=> Note, note=> note.leadNote, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn()
    note: Note;
}
