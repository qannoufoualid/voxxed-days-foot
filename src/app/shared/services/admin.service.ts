import { Component, OnInit, Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ServerSocketService } from './server-socket.service'
import { Player } from '../../bo/player';
import { AuthenticationService } from './authentication.service';
import { UtilsService } from './utils.service';
import { Message } from '../../bo/message';
import { Action } from '../../bo/action.enum';
import { MappingConfigurationService } from './mapping-configuration.service';
import { Status } from '../../bo/status.enum';


@Injectable()
export class AdminService {

  private players : BehaviorSubject<Player[]>;
  private stompClient;
  private socketSubscription: Subscription;
  
  constructor(private serverSocket: ServerSocketService, private mappingConfigurationService : MappingConfigurationService,private router: Router, private authenticationService : AuthenticationService, private utilsService : UtilsService) {
    this.players = new BehaviorSubject<Player[]>([]);

    let m : Message = new Message(null, Action.GET_ALL_PLAYERS_ACTION, []);
    this.serverSocket.send(m);
    if(this.socketSubscription == null)
    this.socketSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {
      if(utilsService.isJson(message) && message != null){
        let m : Message = JSON.parse(message);
        let action = this.mappingConfigurationService.getActionName(Action.GET_ALL_PLAYERS_RESPONSE);
        let status = this.mappingConfigurationService.getStatusName(Status.SUCCEED);
        let isLoaded = this.mappingConfigurationService.isLoaded();
        if(isLoaded && (m.action === action)){
          let recievedPlayers : Player[] = m.data.stats;
          this.setPlayers(recievedPlayers);
        }
      }
    })
  }

  public getPlayers(): Observable<Player[]> {
    return this.players.asObservable();
  }

  public setPlayers(newValue: Player[]): void {
    newValue.sort((a: Player, b: Player) => {
      if (a.score < b.score) {
        return 1;
      } else if (a.score > b.score) {
        return -1;
      } else {
        return 0;
      }
    });
    let i = 1;
    newValue.forEach(player => player.rank = i++);
    this.players.next(newValue);
  }




}