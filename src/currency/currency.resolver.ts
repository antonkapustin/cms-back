import { Resolver, Query, Args } from '@nestjs/graphql';
import { CurrencyService } from './currency.service';
import { Currency } from './entities/currency.entity';

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Query(() => [Currency], { name: 'currencies' })
  getAll() {
    return this.currencyService.getAllCurrencies();
  }

  @Query(() => Currency, { name: 'currency', nullable: true })
  getOne(@Args('code', { type: () => String }) code: string) {
    return this.currencyService.getByCode(code);
  }
}
