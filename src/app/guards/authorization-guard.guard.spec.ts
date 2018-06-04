import { TestBed, async, inject } from '@angular/core/testing';

import { AuthorizationGuardGuard } from './authorization-guard.guard';

describe('AuthorizationGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationGuardGuard]
    });
  });

  it('should ...', inject([AuthorizationGuardGuard], (guard: AuthorizationGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
