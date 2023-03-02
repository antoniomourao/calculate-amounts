import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('Home Component', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a title', () => {
    const titleText = fixture.nativeElement.querySelector('h1').textContent;
    expect(titleText).toEqual(component.title);
  });
});
