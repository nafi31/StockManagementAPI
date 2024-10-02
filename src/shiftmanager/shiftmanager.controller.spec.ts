import { Test, TestingModule } from '@nestjs/testing';
import { ShiftmanagerController } from './shiftmanager.controller';
import { ShiftmanagerService } from './shiftmanager.service';

describe('ShiftmanagerController', () => {
  let controller: ShiftmanagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShiftmanagerController],
      providers: [ShiftmanagerService],
    }).compile();

    controller = module.get<ShiftmanagerController>(ShiftmanagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
