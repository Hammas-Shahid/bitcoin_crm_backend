import { Test, TestingModule } from '@nestjs/testing';
import { LeadCallsController } from './lead-calls.controller';
import { LeadCallsService } from './lead-calls.service';

describe('LeadCallsController', () => {
  let controller: LeadCallsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadCallsController],
      providers: [LeadCallsService],
    }).compile();

    controller = module.get<LeadCallsController>(LeadCallsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
