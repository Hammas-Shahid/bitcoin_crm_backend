import { Test, TestingModule } from '@nestjs/testing';
import { LeadCallbacksService } from './lead-callbacks.service';

describe('LeadCallbacksService', () => {
  let service: LeadCallbacksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadCallbacksService],
    }).compile();

    service = module.get<LeadCallbacksService>(LeadCallbacksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
