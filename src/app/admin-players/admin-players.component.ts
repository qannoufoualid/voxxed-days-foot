import { Component, OnInit } from '@angular/core';
import { Player } from '../bo/player';
import { AdminService } from '../shared/services/admin.service';

/**
 * Component that handles the list of players.
 */
@Component({
  selector: 'app-admin-players',
  templateUrl: './admin-players.component.html',
  styleUrls: ['./admin-players.component.css']
})
export class AdminPlayersComponent implements OnInit {

  players : Player[];
  
  constructor(private adminService: AdminService) {
    this.adminService.getPlayers().subscribe( players => {
        this.players = players;
    });
  }


  ngOnInit() {
  }

}
