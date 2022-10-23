import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MxStorePublicComponent } from './mx-store-public.component';

describe('MxStorePublicComponent', () => {
  let component: MxStorePublicComponent;
  let fixture: ComponentFixture<MxStorePublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MxStorePublicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MxStorePublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
