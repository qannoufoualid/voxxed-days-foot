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
import { AlertService } from './alert.service';
import { LoaderService } from './loader.service';
import { Subject } from 'rxjs';

/**
 * Service to handle the data of the administration part of the appalication.
 */
@Injectable()
export class AdminService {

  private _isHiddingHeaderSubject : Subject<boolean>;
  private _isHiddingHeader : boolean;
  // The list of playersto display.
  private players : BehaviorSubject<Player[]>;
  // The subscription to the socket.
  private socketSubscription: Subscription;
  
  constructor(private serverSocket: ServerSocketService, private mappingConfigurationService : MappingConfigurationService,private router: Router, private authenticationService : AuthenticationService, private utilsService : UtilsService, private alertService : AlertService, private loaderService : LoaderService) { 

    this._isHiddingHeaderSubject = new BehaviorSubject<boolean>(this._isHiddingHeader);
    this.players = new BehaviorSubject<Player[]>([]);
    
    //Send a message to the backend to get the list of players.
    let m : Message = new Message(null, Action.GET_ALL_STATS, {});
    this.loaderService.show();
    this.serverSocket.send(m);

    //Make a subscription to 
    if(this.socketSubscription == null)
    this.socketSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {
      if(utilsService.isJson(message) && message != null){
        let m : Message = JSON.parse(message);
        let action = this.mappingConfigurationService.getActionName(Action.GET_ALL_STATS_RESPONSE);
        let status = this.mappingConfigurationService.getStatusName(Status.SUCCEED);
        let isLoaded = this.mappingConfigurationService.isLoaded();
        if(isLoaded && (m.action === action) && (m.status === status)){
          let recievedPlayers : Player[] = m.data.stats;
          this.setPlayers(recievedPlayers);
        }else if(m.status != status)
            this.alertService.error('Cannot get the list of players. Reason : '+m.data.error);
      }
    })
  }

  // Get the players
  public getPlayers(): Observable<Player[]> {
    return this.players.asObservable();
  }

  // Set the players
  public setPlayers(newValue: Player[]): void {

    //We sort the list of players depending on there score
    newValue.sort((a: Player, b: Player) => {
      if (a.score < b.score) {
        return 1;
      } else if (a.score > b.score) {
        return -1;
      } else {
        if (a.games < b.games) {
          return -1;
        } else if (a.games > b.games) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    
    let i = 1;
    newValue.forEach(player => player.rank = i++);
    this.players.next(newValue);
  }

  public switchHeaderHideState(){
    this._isHiddingHeader = !this._isHiddingHeader;
    this._isHiddingHeaderSubject.next(this._isHiddingHeader);
  }

  get isHiddingHeader() : Subject<boolean>
  {
    return this._isHiddingHeaderSubject;
  }

}