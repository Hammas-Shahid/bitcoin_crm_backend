import { Test, TestingModule } from '@nestjs/testing';
import { LeadNotesService } from './lead-notes.service';

describe('LeadNotesService', () => {
  let service: LeadNotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadNotesService],
    }).compile();

    service = module.get<LeadNotesService>(LeadNotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
