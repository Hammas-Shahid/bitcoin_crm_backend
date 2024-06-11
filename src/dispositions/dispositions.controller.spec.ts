import { Test, TestingModule } from '@nestjs/testing';
import { DispositionsController } from './dispositions.controller';
import { DispositionsService } from './dispositions.service';

describe('DispositionsController', () => {
  let controller: DispositionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispositionsController],
      providers: [DispositionsService],
    }).compile();

    controller = module.get<DispositionsController>(DispositionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
