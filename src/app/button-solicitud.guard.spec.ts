import { TestBed } from '@angular/core/testing';

import { ButtonSolicitudGuard } from './button-solicitud.guard';

describe('ButtonSolicitudGuard', () => {
  let guard: ButtonSolicitudGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ButtonSolicitudGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
