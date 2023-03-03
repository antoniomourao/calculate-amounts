import { IAmounts } from '../interfaces/amounts.interface';

/**
 * Calculates amounts for any given amount: Price, vat, price with vat
 * Assuming that all amounts have two decimals
 *
 * @export
 * @class CalculateUtils
 */
export class CalculateUtils {
  /**
   * Calculate Vat and Price with Vat from given Price
   *
   * @param value
   * @param taxValue
   * @returns
   */
  public static fromPrice(value: number, taxValue: number): IAmounts {
    const amounts: IAmounts = {
      price: 0,
      vatValue: 0,
      priceWithVat: 0,
    };

    if (!isNaN(value) && !isNaN(taxValue) && value > 0 && taxValue > 0) {
      amounts.price = this.roundToTwoNumber(value);
      amounts.vatValue = this.roundToTwoNumber(amounts.price * taxValue);
      amounts.priceWithVat = this.roundToTwoNumber(amounts.price + amounts.vatValue);
    }

    return amounts;
  }

  /**
   * Calculate Price and Price with Vat from given Vat value
   *
   * @param value
   * @param taxValue
   * @returns
   */
  public static fromVat(value: number, taxValue: number): IAmounts {
    const amounts: IAmounts = {
      price: 0,
      vatValue: 0,
      priceWithVat: 0,
    };

    if (!isNaN(value) && !isNaN(taxValue) && value > 0 && taxValue > 0) {
      amounts.vatValue = this.roundToTwoNumber(value);
      amounts.price = this.roundToTwoNumber(
        (amounts.vatValue * 100) / (taxValue * 100)
      );
      amounts.priceWithVat = this.roundToTwoNumber(amounts.price + amounts.vatValue);
    }

    return amounts;
  }

  /**
   * Calculate Price and Price with Vat from given Vat value
   *
   * @param value
   * @param taxValue
   * @returns
   */
  public static fromPriceWithVat(
    value: number,
    taxValue: number
  ): IAmounts {
    const amounts: IAmounts = {
      price: 0,
      vatValue: 0,
      priceWithVat: 0,
    };

    if (!isNaN(value) && !isNaN(taxValue) && value > 0 && taxValue > 0) {
      const taxTotal = (taxValue + 1) * 100;

      amounts.priceWithVat = this.roundToTwoNumber(value);
      amounts.vatValue = this.roundToTwoNumber(
        (amounts.priceWithVat * (taxValue * 100)) / taxTotal
      );
      amounts.price = this.roundToTwoNumber(amounts.priceWithVat - amounts.vatValue);
    }

    return amounts;
  }

  /**
   * Round number to two decimals
   *
   * @param value
   * @returns
   */
  public static roundToTwoNumber(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
