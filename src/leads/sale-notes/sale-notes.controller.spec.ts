import { Test, TestingModule } from '@nestjs/testing';
import { SaleNotesController } from './sale-notes.controller';
import { SaleNotesService } from './sale-notes.service';

describe('SaleNotesController', () => {
  let controller: SaleNotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleNotesController],
      providers: [SaleNotesService],
    }).compile();

    controller = module.get<SaleNotesController>(SaleNotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
