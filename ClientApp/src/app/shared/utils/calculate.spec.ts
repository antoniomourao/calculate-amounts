import { IAmounts } from "../interfaces/amounts.interface";
import { CalculateUtils } from "./calculate.util";

describe('Calculate Utils', () => {

  it('RQ01 - Should calculate VAT and Price With VAT', () => {
    const taxValue = 0.23;
    const expectedResult: IAmounts = {
      price: 100,
      vatValue: 23,
      priceWithVat: 123,
    };

    const result = CalculateUtils.fromPrice(expectedResult.price, taxValue);
    expect(result).toEqual(expectedResult);
  });

  it('RQ02 - Should calculate Price and Price With VAT', () => {
    const taxValue = 0.23;
    const expectedResult: IAmounts = {
      price: 100,
      vatValue: 23,
      priceWithVat: 123,
    };

    const result = CalculateUtils.fromVat(expectedResult.vatValue, taxValue);
    expect(result).toEqual(expectedResult);
  });

  it('RQ03 - Should calculate Price and VAT', () => {
    const taxValue = 0.23;
    const expectedResult: IAmounts = {
      price: 100,
      vatValue: 23,
      priceWithVat: 123,
    };

    const result = CalculateUtils.fromPriceWithVat(
      expectedResult.priceWithVat,
      taxValue
    );
    expect(result).toEqual(expectedResult);
  });


  it('RQ04 - Should calculate Price and VAT', () => {
    const taxValue = 0.23;
    const expectedResult: IAmounts = {
      price: 10,
      vatValue: 2.3,
      priceWithVat: 12.3,
    };

    const result = CalculateUtils.fromPriceWithVat(
      expectedResult.priceWithVat,
      taxValue
    );
    expect(result).toEqual(expectedResult);
  });
});
