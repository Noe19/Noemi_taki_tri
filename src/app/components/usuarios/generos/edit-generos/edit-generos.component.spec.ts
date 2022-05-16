import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGenerosComponent } from './edit-generos.component';

describe('EditGenerosComponent', () => {
  let component: EditGenerosComponent;
  let fixture: ComponentFixture<EditGenerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGenerosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGenerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
