import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CountryDataService } from "src/app/shared";
import { ICountry } from "../../shared/interfaces/country.interface";

@Injectable()
export class CalculateAmountsService {
  /** Title */
  public get title(): string {
    return 'Calculate Amounts';
  }

  /** country items list to populate drop down */
  public get countryList$(): BehaviorSubject<ICountry[]> {
    return this.countryDataService.countryList$;
  }

  constructor(private readonly countryDataService: CountryDataService) {}
}
