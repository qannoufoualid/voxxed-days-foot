import { Component, Input } from '@angular/core';
import { Data } from '../bo/data';

/**
 * Component to handle the list of errors
 */
@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html'
})
export class ErrorListComponent {

  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Data[]) {
    
    this.formattedErrors = errorList.map(error => {return error.key+" "+error.value});
  }

  get errorList() { return this.formattedErrors; }

}