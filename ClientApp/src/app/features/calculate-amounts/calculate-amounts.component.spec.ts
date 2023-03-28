import { DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { CalculateUtils, CountryDataService, IAmounts } from 'src/app/shared';
import { MockCountryDataService } from 'src/app/shared/tests/mock-country-data.service';

import { CalculateAmountsComponent } from './calculate-amounts.component';
import { CalculateAmountsService } from './calculate-amounts.service';
describe('Calculate Amounts Component', () => {
  let fixture: ComponentFixture<CalculateAmountsComponent>;
  let component: CalculateAmountsComponent;
  let debugElement: DebugElement;
  let mockCountryDataService: MockCountryDataService;

  beforeEach(async(() => {
    mockCountryDataService = new MockCountryDataService();

    TestBed.configureTestingModule({
      imports: [AppModule],
      declarations: [CalculateAmountsComponent],
      providers: [
        CalculateAmountsService,
        {
          provide: CountryDataService,
          useValue: mockCountryDataService,
        },
      ],
    })
      .overrideProvider('BASE_URL', { useFactory: () => 'http://fake.com' })
      .overrideComponent(CalculateAmountsComponent, {
        set: {
          providers: [
            {
              provide: CountryDataService,
              useValue: mockCountryDataService,
            },
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateAmountsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('RQ01 - Should only display a title and combo with countries', fakeAsync(() => {
    const spyMockCountryDataService = spyOnProperty(
      mockCountryDataService,
      'countryList$',
      'get'
    );

    fixture.detectChanges();

    const titleText = fixture.nativeElement.querySelector('h1').textContent;

    const vatSelection = debugElement.query(By.css('.selectVatRate'));
    const selectInputAmounts = debugElement.query(
      By.css('.selectInputAmounts')
    );

    expect(titleText).toEqual(component.title);
    expect(vatSelection).toBeNull();
    expect(selectInputAmounts).toBeNull();
    expect(spyMockCountryDataService).toHaveBeenCalled();

    spyMockCountryDataService.calls.reset();
  }));

  it('RQ02 - Should allow select vat taxes for selected country', fakeAsync(() => {
    fixture.detectChanges();
    const titleText = fixture.nativeElement.querySelector('h1').textContent;

    component.form
      .get('country')
      ?.patchValue(mockCountryDataService.mockCountryList[0]);
    fixture.detectChanges();
    component.onCountryChange();

    /** check if vat taxes are loaded */
    expect(component.vatRatesList.length).toEqual(
      mockCountryDataService.mockCountryList[0].vatRates.length
    );

    const vatSelection = debugElement.query(By.css('.selectVatRate'));
    const selectInputAmounts = debugElement.query(
      By.css('.selectInputAmounts')
    );

    expect(titleText).toEqual(component.title);
    expect(vatSelection).toBeDefined();
    expect(selectInputAmounts).toBeNull();
  }));

  it('RQ03 - Should allow select input amount when a tax rate is selected', fakeAsync(() => {
    fixture.detectChanges();
    const titleText = fixture.nativeElement.querySelector('h1').textContent;

    component.form
      .get('country')
      ?.patchValue(mockCountryDataService.mockCountryList[0]);
    fixture.detectChanges();
    component.onCountryChange();

    component.form
      .get('vatRate')
      ?.patchValue(mockCountryDataService.mockCountryList[0].vatRates[0]);
    fixture.detectChanges();
    component.onVatRateChange();

    const vatSelection = debugElement.query(By.css('.selectVatRate'));
    const selectInputAmounts = debugElement.query(
      By.css('.selectInputAmounts')
    );

    expect(titleText).toEqual(component.title);
    expect(vatSelection).toBeDefined();
    expect(selectInputAmounts).toBeDefined();
  }));

  it('RQ04 - Should allow input price and have VAT and Price With VAT calculated', fakeAsync(() => {
    fixture.detectChanges();
    const titleText = fixture.nativeElement.querySelector('h1').textContent;

    component.form
      .get('country')
      ?.patchValue(mockCountryDataService.mockCountryList[0]);
    fixture.detectChanges();
    component.onCountryChange();

    const price = 100;
    const vatRate = mockCountryDataService.mockCountryList[0].vatRates[0];

    component.form.get('vatRate')?.patchValue(vatRate);
    fixture.detectChanges();
    component.onVatRateChange();

    expect(component.form.get('price')?.value || 0).toEqual(0);
    expect(component.form.get('vatValue')?.value || 0).toEqual(0);
    expect(component.form.get('priceWithVat')?.value || 0).toEqual(0);

    /** setup selected input to be price */
    component.form.get('amountInput')?.patchValue('price');
    /** set price value to trigger calculations */
    component.form.get('price')?.patchValue(price);
    component.onValChange('price');
    fixture.detectChanges();

    const expectedAmounts: IAmounts = CalculateUtils.fromPrice(price, vatRate);

    expect(component.form.get('price')?.value || 0).toEqual(
      expectedAmounts.price
    );
    expect(component.form.get('vatValue')?.value || 0).toEqual(
      expectedAmounts.vatValue
    );
    expect(component.form.get('priceWithVat')?.value || 0).toEqual(
      expectedAmounts.priceWithVat
    );

    const vatSelection = debugElement.query(By.css('.selectVatRate'));
    const selectInputAmounts = debugElement.query(
      By.css('.selectInputAmounts')
    );

    expect(titleText).toEqual(component.title);
    expect(vatSelection).toBeDefined();
    expect(selectInputAmounts).toBeDefined();

    expect(component.priceIsDisabled).toBeFalsy();
    expect(component.currentVatRate).toBeDefined();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const priceInput = debugElement.query(
        By.css('.priceInput')
      ).nativeElement;
      const vatValueInput = debugElement.query(
        By.css('.vatValueInput')
      ).nativeElement;
      const priceWithVatInput = debugElement.query(
        By.css('.priceWithVatInput')
      ).nativeElement;

      expect(priceInput.readOnly).toBeFalsy();
      expect(vatValueInput.readOnly).toBeTruthy();
      expect(priceWithVatInput.readOnly).toBeTruthy();
    });
  }));

  it('RQ05 - Should allow input VAT Value and have Price and Price With VAT calculated', fakeAsync(() => {
    fixture.detectChanges();
    const titleText = fixture.nativeElement.querySelector('h1').textContent;

    component.form
      .get('country')
      ?.patchValue(mockCountryDataService.mockCountryList[0]);
    fixture.detectChanges();
    component.onCountryChange();

    const vatValue = 100;
    const vatRate = mockCountryDataService.mockCountryList[0].vatRates[0];

    component.form.get('vatRate')?.patchValue(vatRate);
    fixture.detectChanges();
    component.onVatRateChange();

    expect(component.form.get('price')?.value || 0).toEqual(0);
    expect(component.form.get('vatValue')?.value || 0).toEqual(0);
    expect(component.form.get('priceWithVat')?.value || 0).toEqual(0);

    /** setup selected input to be vatValue */
    component.form.get('amountInput')?.patchValue('vatValue');
    /** set vat value to trigger calculations */
    component.form.get('vatValue')?.patchValue(vatValue);
    component.onValChange('vatValue');
    fixture.detectChanges();

    const expectedAmounts: IAmounts = CalculateUtils.fromVat(vatValue, vatRate);

    expect(component.form.get('price')?.value || 0).toEqual(
      expectedAmounts.price
    );
    expect(component.form.get('vatValue')?.value || 0).toEqual(
      expectedAmounts.vatValue
    );
    expect(component.form.get('priceWithVat')?.value || 0).toEqual(
      expectedAmounts.priceWithVat
    );

    const vatSelection = debugElement.query(By.css('.selectVatRate'));
    const selectInputAmounts = debugElement.query(
      By.css('.selectInputAmounts')
    );

    expect(titleText).toEqual(component.title);
    expect(vatSelection).toBeDefined();
    expect(selectInputAmounts).toBeDefined();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      const priceInput = debugElement.query(
        By.css('.priceInput')
      ).nativeElement;
      const vatValueInput = debugElement.query(
        By.css('.vatValueInput')
      ).nativeElement;
      const priceWithVatInput = debugElement.query(
        By.css('.priceWithVatInput')
      ).nativeElement;

      expect(priceInput.readOnly).toBeTruthy();
      expect(vatValueInput.readOnly).toBeFalsy();
      expect(priceWithVatInput.readOnly).toBeTruthy();
    });
  }));

  it('RQ06 - Should allow input Price With Vat Value and have Price and VAT calculated', fakeAsync(() => {
    fixture.detectChanges();
    const titleText = fixture.nativeElement.querySelector('h1').textContent;

    component.form
      .get('country')
      ?.patchValue(mockCountryDataService.mockCountryList[0]);
    fixture.detectChanges();
    component.onCountryChange();

    const priceWithVat = 100;
    const vatRate = mockCountryDataService.mockCountryList[0].vatRates[0];

    component.form.get('vatRate')?.patchValue(vatRate);
    fixture.detectChanges();
    component.onVatRateChange();

    expect(component.form.get('price')?.value || 0).toEqual(0);
    expect(component.form.get('vatValue')?.value || 0).toEqual(0);
    expect(component.form.get('priceWithVat')?.value || 0).toEqual(0);

    /** setup selected input to be vatValue */
    component.form.get('amountInput')?.patchValue('priceWithVat');
    /** set vat value to trigger calculations */
    component.form.get('priceWithVat')?.patchValue(priceWithVat);
    component.onValChange('priceWithVat');
    fixture.detectChanges();

    const expectedAmounts: IAmounts = CalculateUtils.fromPriceWithVat(
      priceWithVat,
      vatRate
    );

    expect(component.form.get('price')?.value || 0).toEqual(
      expectedAmounts.price
    );
    expect(component.form.get('vatValue')?.value || 0).toEqual(
      expectedAmounts.vatValue
    );
    expect(component.form.get('priceWithVat')?.value || 0).toEqual(
      expectedAmounts.priceWithVat
    );

    const vatSelection = debugElement.query(By.css('.selectVatRate'));
    const selectInputAmounts = debugElement.query(
      By.css('.selectInputAmounts')
    );

    expect(titleText).toEqual(component.title);
    expect(vatSelection).toBeDefined();
    expect(selectInputAmounts).toBeDefined();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const priceInput = debugElement.query(
        By.css('.priceInput')
      ).nativeElement;
      const vatValueInput = debugElement.query(
        By.css('.vatValueInput')
      ).nativeElement;
      const priceWithVatInput = debugElement.query(
        By.css('.priceWithVatInput')
      ).nativeElement;

      expect(priceInput.readOnly).toBeTruthy();
      expect(vatValueInput.readOnly).toBeTruthy();
      expect(priceWithVatInput.readOnly).toBeFalsy();
    });
  }));
});
