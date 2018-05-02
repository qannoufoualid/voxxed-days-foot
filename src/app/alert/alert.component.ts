import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  message: any;
  timerToken: any;
  freezeTime : number = 3 * 1000;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
      setTimeout(() => this.hide(), this.freezeTime); 
    });
  }
  hide(){
    this.message = null;
  }

}
