import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAceptadasComponent } from './solicitud-aceptadas.component';

describe('SolicitudAceptadasComponent', () => {
  let component: SolicitudAceptadasComponent;
  let fixture: ComponentFixture<SolicitudAceptadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudAceptadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudAceptadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
