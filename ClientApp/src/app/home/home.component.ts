import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Country } from '../domain/country.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  /** form title */
  public title = 'Calculate Amount';

  /** country items */
  public countryItems: Country[] = [
    {
      name: 'Teste 1',
      currency: '€',
      decimalPlaces: 2,
      flag: 'pt',
      vat: [12, 23],
    },
  ];

  public formGroup = new FormGroup({
    country: new FormControl(''),
    vatRate: new FormControl(''),
    price: new FormControl(''),
    taxValue: new FormControl(''),
    priceWithVat: new FormControl(''),
  });
}
