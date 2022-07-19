import { TestBed } from '@angular/core/testing';

import { PermisosGuard } from './permisos.guard';

describe('PermisosGuard', () => {
  let guard: PermisosGuard;
  let usuario:any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermisosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  


});
