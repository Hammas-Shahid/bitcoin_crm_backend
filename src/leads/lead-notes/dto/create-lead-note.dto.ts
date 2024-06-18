import { IsNumber, IsString } from "class-validator";

export class CreateLeadNoteDto {
    @IsNumber()
    leadId: number;

    @IsString()
    content: string;
}
