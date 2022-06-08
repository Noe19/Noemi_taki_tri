import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCancionesComponent } from './create-canciones.component';

describe('CreateCancionesComponent', () => {
  let component: CreateCancionesComponent;
  let fixture: ComponentFixture<CreateCancionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCancionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
