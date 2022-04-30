import { TestBed } from '@angular/core/testing';

import { PermisosAdministradorGuard } from './permisos-administrador.guard';

describe('PermisosAdministradorGuard', () => {
  let guard: PermisosAdministradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermisosAdministradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
