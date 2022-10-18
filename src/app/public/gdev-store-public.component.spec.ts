import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdevStorePublicComponent } from './gdev-store-public.component';

describe('GdevStorePublicComponent', () => {
  let component: GdevStorePublicComponent;
  let fixture: ComponentFixture<GdevStorePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GdevStorePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdevStorePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
