import { UnauthorizedException } from "@nestjs/common";

export class EmailNotFoundException extends UnauthorizedException {
    constructor(){
        super('Email not found.');
    }
}