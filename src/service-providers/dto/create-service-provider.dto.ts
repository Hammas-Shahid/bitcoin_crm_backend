import { IsOptional, IsString } from "class-validator";

export class CreateServiceProviderDto {
    @IsOptional()
    @IsString()
    name: string;
}
