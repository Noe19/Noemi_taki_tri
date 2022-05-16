import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudRechazadasComponent } from './solicitud-rechazadas.component';

describe('SolicitudRechazadasComponent', () => {
  let component: SolicitudRechazadasComponent;
  let fixture: ComponentFixture<SolicitudRechazadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudRechazadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudRechazadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
