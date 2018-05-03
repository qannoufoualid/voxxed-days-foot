import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';

/**
 * A component to display success et error messages of the application.
 */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  // The message to display
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

  hide(){
    this.message = null;
  }

}
