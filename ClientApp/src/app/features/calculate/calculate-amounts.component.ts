import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAmounts } from '../../shared/interfaces/amounts.interface';
import { ICountry } from '../../shared/interfaces/country.interface';
import { CalculateUtils } from '../../shared/utils/calculate.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.formGroup = this.fb.group({
      country: new FormControl('', Validators.n),
      vatRate: new FormControl(''),
      price: new FormControl(''),
      taxValue: new FormControl(''),
      priceWithVat: new FormControl(''),
    });
  }

  public ngOnInit(): void {}
}
