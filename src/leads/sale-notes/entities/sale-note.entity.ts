import { Lead } from "src/leads/entities/lead.entity";
import { Note } from "src/notes/entities/note.entity";
import { BasicEntity } from "src/shared/entities/base-entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class SaleNote extends BasicEntity{
    @Column()
    saleId: number;

    @Column()
    noteId: number;

    @ManyToOne(()=> Lead, s=> s.saleNotes, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    sale: Lead;

    @OneToOne(()=> Note, note=> note.saleNote, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn()
    note: Note;
}
