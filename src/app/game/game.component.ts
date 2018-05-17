import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class GameComponent implements OnInit,  OnDestroy  {

  private broadcastSocketSubscription: Subscription;
  private gameStateSocketSubscription: Subscription;
  private lastSystemMessageSocketSubscription : Subscription;
  message: string;
  lastMessage : string;
  private isGameRunning: boolean = false;
  
  constructor(private serverSocket: ServerSocketService, private utilsService: UtilsService, private mappingConfigurationService: MappingConfigurationService, private alertService: AlertService) { }

  ngOnInit() {
    if (this.lastSystemMessageSocketSubscription == null)
      this.lastSystemMessageSocketSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {
        if (this.utilsService.isJson(message) && message != null) {
          let m: Message = JSON.parse(message);
          if(m.data['systemMessage'])
          {
            this.lastMessage = m.data['systemMessage'];
          }
        }
      });
  }

  broadcast() {

    if (!confirm('Are you sure you want to broadcast the message?')) {
      return;
    }

    // Create the message.
    let m: Message = new Message(null, Action.SET_SYSTEM_MESSAGE, { 'message': this.message });
    // Send the message.
    this.serverSocket.send(m);

    //Reset the message
    this.lastMessage = this.message;
    //We subscribe only once
    if (this.broadcastSocketSubscription == null)
      this.broadcastSocketSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {

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

  changeGameState(stop : boolean) {

    if (!confirm('Are you sure you want to ' + ((stop) ? 'shut down' : 'start') + ' the tournament?')) {
      return;
    }

    // Create the message.
    let m: Message = new Message(null, stop ? Action.END_TOURNAMENT : Action.START_TOURNAMENT, {});
    // Send the message.
    this.serverSocket.send(m);

    //We subscribe only once
    if (this.gameStateSocketSubscription == null)
      this.gameStateSocketSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {
        if (this.utilsService.isJson(message) && message != null) {
          let m: Message = JSON.parse(message);
          let actionStart = this.mappingConfigurationService.getActionName(Action.START_TOURNAMENT_RESPONSE);
          let actionStop = this.mappingConfigurationService.getActionName(Action.END_TOURNAMENT_RESPONSE);
          let status = this.mappingConfigurationService.getStatusName(Status.SUCCEED);
          let isLoaded = this.mappingConfigurationService.isLoaded();
          if (isLoaded && (m.action === actionStart || m.action == actionStop))
            if (m.status === status) {
              this.isGameRunning = (actionStart === m.action);
              this.alertService.success("Tournament has been " + ((this.isGameRunning) ? "started" : "stopped") + " successfully");
            }
            else {
              this.alertService.error("Problem :  " + m.data.error);
            }
        }
      });
  }

  ngOnDestroy() 
  {
    this.lastSystemMessageSocketSubscription.unsubscribe();
    if(this.gameStateSocketSubscription != null)
       this.gameStateSocketSubscription.unsubscribe();
    if(this.broadcastSocketSubscription != null)
      this.broadcastSocketSubscription.unsubscribe();
  }
  
}
