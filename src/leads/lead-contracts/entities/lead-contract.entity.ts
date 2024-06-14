import { Lead } from "src/leads/entities/lead.entity";
import { BasicEntity } from "src/shared/entities/base-entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class LeadContract extends BasicEntity{
    @Column()
    rate: string;

    @Column()
    durationInDays: number;

    @Column()
    signedDate: string;

    @Column()
    scheduleDate: string;

    @Column()
    installationDate: string;

    @Column()
    leadId: number;

    @OneToOne(() => Lead, lead => lead.leadContract)
    @JoinColumn({ name: 'leadId' })
    lead: Lead;
}
