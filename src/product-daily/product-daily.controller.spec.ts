import { Test, TestingModule } from '@nestjs/testing';
import { ProductDailyController } from './product-daily.controller';
import { ProductDailyService } from './product-daily.service';

describe('ProductDailyController', () => {
  let controller: ProductDailyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductDailyController],
      providers: [ProductDailyService],
    }).compile();

    controller = module.get<ProductDailyController>(ProductDailyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
