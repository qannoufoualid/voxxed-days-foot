import { TestBed, inject } from '@angular/core/testing';

import { CanActivateViaAuthGuardService } from './can-activate-via-auth-guard.service';

describe('CanActivateViaAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateViaAuthGuardService]
    });
  });

  it('should be created', inject([CanActivateViaAuthGuardService], (service: CanActivateViaAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
