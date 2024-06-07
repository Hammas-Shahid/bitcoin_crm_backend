import { UnauthorizedException } from "@nestjs/common";

export class UserStatusException extends UnauthorizedException {
    constructor(){
        super('User is disabled.');
    }
}