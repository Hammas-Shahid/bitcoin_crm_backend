import { Test, TestingModule } from '@nestjs/testing';
import { LeadCallbacksController } from './lead-callbacks.controller';
import { LeadCallbacksService } from './lead-callbacks.service';

describe('LeadCallbacksController', () => {
  let controller: LeadCallbacksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadCallbacksController],
      providers: [LeadCallbacksService],
    }).compile();

    controller = module.get<LeadCallbacksController>(LeadCallbacksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
