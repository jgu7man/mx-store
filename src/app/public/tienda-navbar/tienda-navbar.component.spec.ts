import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaNavbarComponent } from './tienda-navbar.component';

describe('TiendaNavbarComponent', () => {
  let component: TiendaNavbarComponent;
  let fixture: ComponentFixture<TiendaNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendaNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
