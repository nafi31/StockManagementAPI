import { Test, TestingModule } from '@nestjs/testing';
import { ProductDailyService } from './product-daily.service';

describe('ProductDailyService', () => {
  let service: ProductDailyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductDailyService],
    }).compile();

    service = module.get<ProductDailyService>(ProductDailyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
