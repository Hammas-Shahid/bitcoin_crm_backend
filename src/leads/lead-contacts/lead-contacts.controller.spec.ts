import { Test, TestingModule } from '@nestjs/testing';
import { LeadContactsController } from './lead-contacts.controller';
import { LeadContactsService } from './lead-contacts.service';

describe('LeadContactsController', () => {
  let controller: LeadContactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadContactsController],
      providers: [LeadContactsService],
    }).compile();

    controller = module.get<LeadContactsController>(LeadContactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
