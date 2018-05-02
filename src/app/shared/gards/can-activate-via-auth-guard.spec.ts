import { TestBed, inject } from '@angular/core/testing';

import { CanActivateViaAuthGuard } from './can-activate-via-auth-guard';

describe('CanActivateViaAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateViaAuthGuard]
    });
  });

  it('should be created', inject([CanActivateViaAuthGuard], (service: CanActivateViaAuthGuard) => {
    expect(service).toBeTruthy();
  }));
});
