import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSelectDateComponent } from './select-date.component';

describe('CalendarSelectDateComponent', () => {
  let component: CalendarSelectDateComponent;
  let fixture: ComponentFixture<CalendarSelectDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarSelectDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarSelectDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
