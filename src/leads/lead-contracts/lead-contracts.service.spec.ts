import { Test, TestingModule } from '@nestjs/testing';
import { LeadContractsService } from './lead-contracts.service';

describe('LeadContractsService', () => {
  let service: LeadContractsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadContractsService],
    }).compile();

    service = module.get<LeadContractsService>(LeadContractsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
