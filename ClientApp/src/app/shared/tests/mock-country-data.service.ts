import { BehaviorSubject } from 'rxjs';
import { ICountry } from '..';

export class MockCountryDataService {
  public mockCountryList: ICountry[] = [
    {
      name: 'Austria',
      flag: 'au',
      currency: '€',
      vatRates: [0.05, 0.1, 0.13, 0.2],
      decimalPlaces: 2,
    },
    {
      name: 'Portugal',
      flag: 'pt',
      currency: '€',
      vatRates: [0.13, 0.23],
      decimalPlaces: 2,
    },
  ];

  /** list of countries */
  public _countryList$: BehaviorSubject<ICountry[]> = new BehaviorSubject<
    ICountry[]
  >(this.mockCountryList);

  /** public list of countries */
  public get countryList$(): BehaviorSubject<ICountry[]> {
    return this._countryList$;
  }
}
