import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCancionesComponent } from './show-canciones.component';

describe('ShowCancionesComponent', () => {
  let component: ShowCancionesComponent;
  let fixture: ComponentFixture<ShowCancionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCancionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
