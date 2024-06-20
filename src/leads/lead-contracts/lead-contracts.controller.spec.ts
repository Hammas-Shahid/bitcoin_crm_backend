import { Test, TestingModule } from '@nestjs/testing';
import { LeadContractsController } from './lead-contracts.controller';
import { LeadContractsService } from './lead-contracts.service';

describe('LeadContractsController', () => {
  let controller: LeadContractsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadContractsController],
      providers: [LeadContractsService],
    }).compile();

    controller = module.get<LeadContractsController>(LeadContractsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
