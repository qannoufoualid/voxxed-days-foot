import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { Player } from '../bo/player';
import { AdminService } from '../shared/services/admin.service';

/**
 * Component that shows the score of players.
 */
@Component({
  selector: 'app-admin-score-list',
  templateUrl: './admin-score-list.component.html',
  styleUrls: ['./admin-score-list.component.css']
})
export class AdminScoreListComponent implements OnInit, OnDestroy{

  timerToken: any;
  startIndex : number= 3;
  howMuch : number = 4;
  speed : number = 1*1000;
  players : Player[];
  
  constructor(private adminService: AdminService) {
    this.adminService.getPlayers().subscribe( players => {
        this.players = players;
    });
  }

  ngOnInit() {
    this.start();
  }

  start() {
     this.timerToken = setInterval(() => this.runningLoop(), this.speed);       
  }

  stop() {
      clearTimeout(this.timerToken);
  }

  runningLoop() {
     this.startIndex += this.howMuch;
     if(this.startIndex > this.players.length)
       this.startIndex = 3;    
  }

  ngOnDestroy(){
    clearInterval(this.timerToken);
  }

}
