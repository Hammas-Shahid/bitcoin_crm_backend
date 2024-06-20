import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStatus(): string {
    return 'Bitcoin CRM Backend Server Works!';
  }
}
