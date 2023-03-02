import { Injectable } from "@angular/core";
import { Country } from "./domain/country.interface";

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _countryList: Country[] = [];

  public get countryList(): Country[] {
    return this._countryList;
  }
}
