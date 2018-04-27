import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class CanActivateViaAuthGuard {

  constructor(private authService: AuthenticationService) {}

  canActivate() {
    if (localStorage.getItem('currentUser'))
      return true;
    return false;
  }

}
