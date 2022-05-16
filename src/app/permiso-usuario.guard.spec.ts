import { TestBed } from '@angular/core/testing';

import { PermisoUsuarioGuard } from './permiso-usuario.guard';

describe('PermisoUsuarioGuard', () => {
  let guard: PermisoUsuarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermisoUsuarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
