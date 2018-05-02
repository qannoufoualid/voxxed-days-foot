import { Injectable } from '@angular/core';

@Injectable()
export class CanActivateViaAuthGuard {

  constructor() {}

  canActivate() {
    if (localStorage.getItem('currentUser'))
      return true;
    return false;
  }

}
