import { Component, OnInit } from '@angular/core';
import { Player } from '../bo/player';
import { AdminService } from '../shared/services/admin.service';
import { ServerSocketService } from '../shared/services/server-socket.service';
import { Action } from '../bo/action.enum';
import { Message } from '../bo/message';
import { Subscription } from 'rxjs';
import { UtilsService } from '../shared/services/utils.service';
import { MappingConfigurationService } from '../shared/services/mapping-configuration.service';
import { Status } from '../bo/status.enum';
import { AlertService } from '../shared/services/alert.service';


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
  private socketSubscription: Subscription;
  private items = [];
  private itemCount = 0;
  filter : string;
  p: number = 1;

  constructor(private alertService : AlertService,private adminService: AdminService, private serverSocket : ServerSocketService, private utilsService : UtilsService, private mappingConfigurationService : MappingConfigurationService) {
    this.adminService.getPlayers().subscribe( players => {
        this.players = players;
    });
  }

  ngOnInit() {
  }

  /**
   * Send a request to the backend to increase the life of a player.
   * @param mail the email of the player
   */
  setMaxHealth(player : Player){

    player.maxHealth = 5;

    // Create the message.
    let m : Message = new Message(null, Action.SET_MAX_HEALTH, {"mail": player.mail, "maxHealth": 5});
    // Send the message.
    this.serverSocket.send(m);

    //We subscribe only once
    if(this.socketSubscription==null)
        this.socketSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {
             
            if(this.utilsService.isJson(message) && message != null)
            {
                let m :  Message = JSON.parse(message);
                let action = this.mappingConfigurationService.getActionName(Action.SET_MAX_HEALTH_RESPONSE);
                let status = this.mappingConfigurationService.getStatusName(Status.SUCCEED);
                let isLoaded = this.mappingConfigurationService.isLoaded();
                if(isLoaded && (m.action === action))
                    if(m.status === status){
                           this.alertService.success("Life added successfully to "+m.data.mail);
                    }
                    else{
                        this.alertService.error("Problem :  "+m.data.error);
                    }
            }
        });

  }

}
