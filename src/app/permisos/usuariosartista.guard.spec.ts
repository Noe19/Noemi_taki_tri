import { TestBed } from '@angular/core/testing';

import { UsuariosartistaGuard } from './usuariosartista.guard';

describe('UsuariosartistaGuard', () => {
  let guard: UsuariosartistaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuariosartistaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
