import { Injectable } from '@nestjs/common';
import currencyCodes from 'currency-codes';

@Injectable()
export class CurrencyService {
  getAllCurrencies() {
    // Приводим данные к удобному формату
    return currencyCodes.data.map((c) => ({
      code: c.code,
      number: c.number,
      digits: c.digits,
      currency: c.currency,
      countries: c.countries,
    }));
  }

  getByCode(code: string) {
    const result = currencyCodes.code(code);
    if (!result) return null;
    return {
      code: result.code,
      number: result.number,
      digits: result.digits,
      currency: result.currency,
      countries: result.countries,
    };
  }
}
