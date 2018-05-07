import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { Player } from '../bo/player';
import { AdminService } from '../shared/services/admin.service';
import { LoaderService } from '../shared/services/loader.service';

/**
 * Component that shows the score of players.
 */
@Component({
  selector: 'app-admin-score-list',
  templateUrl: './admin-score-list.component.html',
  styleUrls: ['./admin-score-list.component.css']
})
export class AdminScoreListComponent implements OnInit, OnDestroy{

  // the setInterval Token.
  timerToken: any;
  // the start index from which the dynamic loading gonna start.
  startIndex : number= 3;
  // How much player to show in the dynamic list.
  howMuch : number = 4;
  // the speed of loading refreshing players.
  speed : number = 3*1000;
  // the list of players.
  players : Player[];
  
  constructor(private adminService: AdminService) {
    // At startup we add an observer to the list of players in the backend.
    this.adminService.getPlayers().subscribe( players => {
        this.players = players;
    });
  }

  ngOnInit() {
    this.start();
  }

  start() {
      // We start the dynamic loading.
     this.timerToken = setInterval(() => this.runningLoop(), this.speed);       
  }

  // The refresh function.
  runningLoop() {
     this.startIndex += this.howMuch;
     if(this.startIndex > this.players.length)
       this.startIndex = 3;    
  }

  // Stop the refresh function.
  ngOnDestroy(){
    clearInterval(this.timerToken);
  }

}
