import { Test, TestingModule } from '@nestjs/testing';
import { LeadContactsService } from './lead-contacts.service';

describe('LeadContactsService', () => {
  let service: LeadContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadContactsService],
    }).compile();

    service = module.get<LeadContactsService>(LeadContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
