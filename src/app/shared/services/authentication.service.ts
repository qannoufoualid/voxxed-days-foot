import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Subscription } from 'rxjs/Subscription'

import { ServerSocketService } from './server-socket.service'
import { UtilsService } from './utils.service';
import { User } from '../../bo/user';
import { Message } from '../../bo/message';
import { MappingConfigurationService } from './mapping-configuration.service';
import { Action } from '../../bo/action.enum';
import { Status } from '../../bo/status.enum';


@Injectable()
export class AuthenticationService implements OnDestroy {
    public token: string;
    private socketSubscription: Subscription;
    private _isConnected : boolean = false;

    constructor(private serverSocket: ServerSocketService, private router: Router, private utilsService : UtilsService, private mappingConfigurationService : MappingConfigurationService) {
    
    }
 
    public authenticate(user : User, callback: (response : Message) => void, errorCallback : (error : string) => void){

        this.serverSocket.connect();
        let m : Message = new Message(null, Action.AUTHENTICATE, {"user": user});
        this.serverSocket.send(m);

        if(this.socketSubscription==null)
        this.socketSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {
            
            if(this.utilsService.isJson(message) && message != null)
            {
                let m :  Message = JSON.parse(message);
                let action = this.mappingConfigurationService.getActionName(Action.AUTHENTICATE_RESPONSE);
                let isLoaded = this.mappingConfigurationService.isLoaded();
                if(isLoaded && (m.action === action))
                    if(m.status === Status.SUCCEED){
                        callback(m);
                        this.isConnected = true;
                    }
                    else{
                        errorCallback(m.data.error);
                        this.isConnected = false;
                    }
            }
        });
    }

    public logout(){
        this.serverSocket.disconnect();
    }

    get isConnected():boolean {
        return this._isConnected;
    }
    set isConnected(c:boolean) {
        this._isConnected = c ;
    }

    ngOnDestroy(){
        console.log('authService Destroyed');
    }

}