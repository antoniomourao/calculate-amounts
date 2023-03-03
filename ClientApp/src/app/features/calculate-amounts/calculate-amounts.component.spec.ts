import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { CalculateAmountsComponent } from './calculate-amounts.component';

describe('Calculate Amounts Component', () => {
  let fixture: ComponentFixture<CalculateAmountsComponent>;
  let component: CalculateAmountsComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalculateAmountsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateAmountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('RQ01 - Should display a title', () => {
    const titleText = fixture.nativeElement.querySelector('h1').textContent;
    expect(titleText).toEqual(component.title);
  });
});
