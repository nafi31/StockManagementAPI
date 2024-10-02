import { Test, TestingModule } from '@nestjs/testing';
import { ShiftmanagerService } from './shiftmanager.service';

describe('ShiftmanagerService', () => {
  let service: ShiftmanagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShiftmanagerService],
    }).compile();

    service = module.get<ShiftmanagerService>(ShiftmanagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
