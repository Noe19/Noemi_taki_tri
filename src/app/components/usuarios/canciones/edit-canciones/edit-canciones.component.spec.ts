import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCancionesComponent } from './edit-canciones.component';

describe('EditCancionesComponent', () => {
  let component: EditCancionesComponent;
  let fixture: ComponentFixture<EditCancionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCancionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
