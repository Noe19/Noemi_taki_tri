import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSistemComponent } from './footer-sistem.component';

describe('FooterSistemComponent', () => {
  let component: FooterSistemComponent;
  let fixture: ComponentFixture<FooterSistemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterSistemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSistemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
