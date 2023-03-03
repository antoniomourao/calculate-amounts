import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  CALCULATE_MAPPER,
  CustomNumericValidator,
  IAmounts,
} from 'src/app/shared';
import { ICountry } from '../../shared/interfaces/country.interface';
import { CalculateAmountsService } from './calculate-amounts.service';

@Component({
  selector: 'app-home',
  templateUrl: './calculate-amounts.component.html',
  styleUrls: ['./calculate-amounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculateAmountsComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription;
  /** list of vat rates from selected country */
  private _vatRatesList$: BehaviorSubject<number[]> = new BehaviorSubject<
    number[]
  >([]);
  /** user selected tax rate */
  private _currentVatRate$: BehaviorSubject<number | null> =
    new BehaviorSubject<number | null>(null);
  private _currentInputField$: BehaviorSubject<string> =
    new BehaviorSubject<string>('price');
  /** check numeric field validations */
  private numericValidationErrors(field: string): string {
    let errors = [];
    const fieldErrors = this.form.get(field);
    if (fieldErrors && fieldErrors.errors && fieldErrors.errors['required']) {
      errors.push('This field is required!');
    }
    if (fieldErrors && fieldErrors.errors && fieldErrors.errors['numeric']) {
      errors.push(`Invalid content! This field is numeric.`);
    }
    if (fieldErrors && fieldErrors.errors && fieldErrors.errors['min']) {
      errors.push(`This field requires values greater than 0!`);
    }

    return errors.join(' | ');
  }
  /** Form Title */
  public get title(): string {
    return this.service.title;
  }

  /** country list to populate Country drop down */
  public get countryList$(): BehaviorSubject<ICountry[]> {
    return this.service.countryList$;
  }

  /** selected country */
  public get selectedCountry(): ICountry {
    return this.form.get('country')?.value;
  }

  /** list of country VAT taxes */
  public get vatRatesList$(): BehaviorSubject<number[]> {
    return this._vatRatesList$;
  }

  /** on country selection changed */
  public onCountryChange(): void {
    this._vatRatesList$.next(this.selectedCountry.vatRates);
    this._currentVatRate$.next(null);
  }

  /** selected country */
  public get selectedVatRate(): number {
    return this.form.get('vatRate')?.value;
  }

  /** on vat rate selection change */
  public onVatRateChange(): void {
    this._currentVatRate$.next(this.selectedVatRate);
  }

  /** selected VAT rate */
  public get currentVatRate$(): BehaviorSubject<number | null> {
    return this._currentVatRate$;
  }

  /** form group */
  public form: FormGroup;

  /** price validation errors */
  public get priceValidationErrors(): string {
    return this.numericValidationErrors('price');
  }

  /** vat value validation errors */
  public get vatValueValidationErrors(): string {
    return this.numericValidationErrors('vatValue');
  }

  /** price with vat validation errors */
  public get priceWithVatValidationErrors(): string {
    return this.numericValidationErrors('priceWithVat');
  }

  /** input field selection changed */
  public onValChange(value: string): void {
    this._currentInputField$.next(value);
    this.priceIsDisabled$.next(value !== 'price');
    this.vatValueIsDisabled$.next(value !== 'vatValue');
    this.priceWithVatIsDisabled$.next(value !== 'priceWithVat');
  }

  /** sets price field disabled */
  public priceIsDisabled$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  /** sets vat value field disabled */
  public vatValueIsDisabled$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  /** sets price with vat field disabled */
  public priceWithVatIsDisabled$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  /**
   * Creates an instance of CalculateAmountsComponent.
   * Initiate form group controls
   * - amountInput set to 'price' (default)
   *
   * @param {FormBuilder} fb
   * @param {CalculateAmountsService} service
   * @memberof CalculateAmountsComponent
   */
  constructor(
    private readonly fb: FormBuilder,
    private readonly service: CalculateAmountsService
  ) {
    this._subscriptions = new Subscription();

    this.form = this.fb.group({
      country: new FormControl(''),
      vatRate: new FormControl(''),
      amountInput: new FormControl('price'),
      price: new FormControl('', [
        Validators.required,
        CustomNumericValidator.numeric,
        Validators.min(0.1),
      ]),
      vatValue: new FormControl('', [
        Validators.required,
        CustomNumericValidator.numeric,
        Validators.min(0),
      ]),
      priceWithVat: new FormControl('', [
        Validators.required,
        CustomNumericValidator.numeric,
        Validators.min(0),
      ]),
    });
  }

  /**
   * Subscribe to form changes to perform calculations
   *
   */
  public ngOnInit(): void {
    this._subscriptions.add(
      this.form.valueChanges.subscribe((values) => {
        let amounts: IAmounts = {
          price: !isNaN(values.price) ? +values.price : 0,
          vatValue: !isNaN(values.vatValue) ? +values.vatValue : 0,
          priceWithVat: !isNaN(values.priceWithVat) ? +values.priceWithVat : 0,
        };
        if (values.amountInput && values.vatRate) {
          amounts = CALCULATE_MAPPER[values.amountInput](
            amounts,
            values.vatRate
          );

          this.form.controls.price.patchValue(amounts.price, {
            emitEvent: false,
          });
          this.form.controls.vatValue.patchValue(amounts.vatValue, {
            emitEvent: false,
          });
          this.form.controls.priceWithVat.patchValue(amounts.priceWithVat, {
            emitEvent: false,
          });
        }
      })
    );
  }

  /** Clean before leaving */
  public ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
