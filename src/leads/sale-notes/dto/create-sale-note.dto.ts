import { IsNumber, IsString } from "class-validator";

export class CreateSaleNoteDto {
    @IsNumber()
    saleId: number;

    @IsString()
    content: string;
}