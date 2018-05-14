import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerSocketService } from '../shared/services/server-socket.service';
import { Message } from '../bo/message';
import { Action } from '../bo/action.enum';
import { UtilsService } from '../shared/services/utils.service';
import { MappingConfigurationService } from '../shared/services/mapping-configuration.service';
import { Status } from '../bo/status.enum';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  private socketSubscription: Subscription;
  private message: string;
  private isGameRunning: boolean = false;

  constructor(private serverSocket: ServerSocketService, private utilsService: UtilsService, private mappingConfigurationService: MappingConfigurationService, private alertService: AlertService) { }

  ngOnInit() {
  }

  broadcast() {


    if (!confirm('Are you sure you want to broadcast the message?')) {
      return;
    }

    // Create the message.
    let m: Message = new Message(null, Action.SET_SYSTEM_MESSAGE, { 'message': this.message });
    // Send the message.
    this.serverSocket.send(m);

    //We subscribe only once
    if (this.socketSubscription == null)
      this.socketSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {

        if (this.utilsService.isJson(message) && message != null) {
          let m: Message = JSON.parse(message);
          let action = this.mappingConfigurationService.getActionName(Action.SET_SYSTEM_MESSAGE_RESPONSE);
          let status = this.mappingConfigurationService.getStatusName(Status.SUCCEED);
          let isLoaded = this.mappingConfigurationService.isLoaded();
          if (isLoaded && (m.action === action))
            if (m.status === status) {
              this.alertService.success("Message broadcasted successfully");
            }
            else {
              this.alertService.error("Problem :  " + m.data.error);
            }
        }
      });
  }

  switchGameState() {

    if (!confirm('Are you sure you want to ' + ((this.isGameRunning) ? 'shut down' : 'start') + ' the game?')) {
      return;
    }

    // Create the message.
    let m: Message = new Message(null, (this.isGameRunning) ? Action.END_TOURNAMENT : Action.START_TOURNAMENT, {});
    // Send the message.
    this.serverSocket.send(m);

    //We subscribe only once
    if (this.socketSubscription == null)
      this.socketSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {
        if (this.utilsService.isJson(message) && message != null) {
          let m: Message = JSON.parse(message);
          let actionStart = this.mappingConfigurationService.getActionName(Action.START_TOURNAMENT_RESPONSE);
          let actionStop = this.mappingConfigurationService.getActionName(Action.END_TOURNAMENT_RESPONSE);
          let status = this.mappingConfigurationService.getStatusName(Status.SUCCEED);
          let isLoaded = this.mappingConfigurationService.isLoaded();
          if (isLoaded && (m.action === actionStart || m.action == actionStop))
            if (m.status === status) {
              this.isGameRunning == (actionStart == m.action);
              this.alertService.success("Game has been " + ((this.isGameRunning) ? "started" : "stopped") + " successfully");
            }
            else {
              this.alertService.error("Problem :  " + m.data.error);
            }
        }
      });
  }
}