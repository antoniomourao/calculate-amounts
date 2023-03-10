import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICountry } from '..';

@Injectable({
  providedIn: 'root',
})
export class CountryDataService {
  /** list of countries */
  public _countryList$: BehaviorSubject<ICountry[]> = new BehaviorSubject<
    ICountry[]
  >([]);

  /** public list of countries */
  public get countryList$(): BehaviorSubject<ICountry[]> {
    return this._countryList$;
  }

  /**
   * Call server and populate country list
   *
   * @param http
   * @param baseUrl
   */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    const ret = http.request('GET', baseUrl + 'api/countryitems');
    http
      .get<ICountry[]>(baseUrl + 'api/countryitems')
      .subscribe({
        next: (result) => {
          this._countryList$.next(result);
        },
        error: (error) => console.error(error),
      });
  }
}
