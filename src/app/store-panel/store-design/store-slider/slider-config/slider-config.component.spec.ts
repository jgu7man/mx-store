import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderConfigComponent } from './slider-config.component';

describe('SliderConfigComponent', () => {
  let component: SliderConfigComponent;
  let fixture: ComponentFixture<SliderConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
