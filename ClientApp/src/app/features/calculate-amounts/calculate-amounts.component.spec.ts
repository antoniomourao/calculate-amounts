import { DebugElement } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  flush,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { CountryDataService, ICountry } from 'src/app/shared';
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
    component.vatRatesList$.subscribe((items) => {
      expect(items.length).toEqual(
        mockCountryDataService.mockCountryList[0].vatRates.length
      );
    });


    const vatSelection = debugElement.query(By.css('.selectVatRate'));
    const selectInputAmounts = debugElement.query(
      By.css('.selectInputAmounts')
    );

    expect(titleText).toEqual(component.title);
    expect(vatSelection).toBeDefined();
    expect(selectInputAmounts).toBeNull();
  }));
});
