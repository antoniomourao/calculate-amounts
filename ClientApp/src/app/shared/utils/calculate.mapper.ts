import { IAmounts } from '../interfaces';
import { CalculateUtils } from './calculate.util';

export const CALCULATE_MAPPER: { [index: string]: any } = {
  ['price']: (amounts: IAmounts, taxRate: number): IAmounts => {
    return CalculateUtils.fromPrice(amounts.price, taxRate);
  },
  ['vatValue']: (amounts: IAmounts, taxRate: number): IAmounts => {
    return CalculateUtils.fromVat(amounts.vatValue, taxRate);
  },
  ['priceWithVat']: (amounts: IAmounts, taxRate: number): IAmounts => {
    return CalculateUtils.fromPriceWithVat(amounts.priceWithVat, taxRate);
  },
};
