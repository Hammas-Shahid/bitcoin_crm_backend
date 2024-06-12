import { Test, TestingModule } from '@nestjs/testing';
import { LeadNotesController } from './lead-notes.controller';
import { LeadNotesService } from './lead-notes.service';

describe('LeadNotesController', () => {
  let controller: LeadNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadNotesController],
      providers: [LeadNotesService],
    }).compile();

    controller = module.get<LeadNotesController>(LeadNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
