import { TestBed } from '@angular/core/testing';

import { PermisoArtistaGuard } from './permiso-artista.guard';

describe('PermisoArtistaGuard', () => {
  let guard: PermisoArtistaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermisoArtistaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
