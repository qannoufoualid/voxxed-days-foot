import { Injectable } from '@angular/core';

/**
 * A gaurd to verify that the user is already logging in
 */
@Injectable()
export class CanActivateViaAuthGuard {

  constructor() {}

  canActivate() {
    // Check if the user in the localstorage.
    if (localStorage.getItem('currentUser'))
      return true;
    return false;
  }

}
