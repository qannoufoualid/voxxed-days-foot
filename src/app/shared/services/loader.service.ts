import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { observableToBeFn } from 'rxjs/testing/TestScheduler';
import { Observable } from 'rxjs';

/**
 * Service to show/hide the loader
 */
@Injectable()
export class LoaderService {

  private subject = new Subject<boolean>();

  constructor() {
  }

  show() {
    this.subject.next(true);
  }

  hide() {
    this.subject.next(false);
  }

  getShow(): Observable<boolean> {
    return this.subject.asObservable();
  }


}
