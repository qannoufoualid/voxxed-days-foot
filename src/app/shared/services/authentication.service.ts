import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs/Subscription'

import { ServerSocketService } from './server-socket.service'
import { UtilsService } from './utils.service';
import { User } from '../../bo/user';
import { Message } from '../../bo/message';
import { MappingConfigurationService } from './mapping-configuration.service';
import { Action } from '../../bo/action.enum';
import { Status } from '../../bo/status.enum';
import { LoaderService } from './loader.service';
import { AlertService } from './alert.service';

/**
 * Service of authentication.
 */
@Injectable()
export class AuthenticationService implements OnDestroy {

    // The authentication subscription to the websocket.
    private socketSubscription: Subscription;
    // The token subscription
    private tokenSubscription: Subscription;
    //To know if the user is connected.
    private _isConnected: boolean = false;

    constructor(private serverSocket: ServerSocketService, private loaderService: LoaderService, private router: Router, private utilsService: UtilsService, private mappingConfigurationService: MappingConfigurationService, private alertService : AlertService) {

        if (this.tokenSubscription == null)
            this.tokenSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {

                if (this.utilsService.isJson(message) && message != null) {
                    let m = JSON.parse(message);
                    if(m.data['error'] && m.data['error'].indexOf('token') > -1){
                        this.logout();
                        this.router.navigate(['/login']);
                        localStorage.removeItem("currentUser");
                        localStorage.removeItem("token");
                    }
                        
                }
            });
    }

    /**
     * handle the authentication of the user
     * @param user the user to be authenticated
     * @param callback the callback to execute after a successful authentication. 
     * @param errorCallback the callback to execute after a wrong authentication.
     */
    public authenticate(user: User, callback: (response: Message) => void, errorCallback: (error: string) => void) {
        this.loaderService.show();
        if(!this.serverSocket.isSocketCreated())
            this.serverSocket.connect();
        let m: Message = new Message(null, Action.AUTHENTICATE, { "mail": user.mail, "password": user.password });
        this.serverSocket.send(m);

        if (this.socketSubscription == null)
            this.socketSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {
                console.log('holla');
                if (this.utilsService.isJson(message) && message != null) {
                    let m: Message = JSON.parse(message);
                    let action = this.mappingConfigurationService.getActionName(Action.AUTHENTICATE_RESPONSE);
                    let status = this.mappingConfigurationService.getStatusName(Status.SUCCEED);
                    let isLoaded = this.mappingConfigurationService.isLoaded();
                    if (isLoaded && (m.action === action))
                        if (m.status === status) {
                            callback(m);
                            this.isConnected = true;
                        }
                        else {
                            errorCallback(m.data.error);
                            this.isConnected = false;
                        }
                    this.loaderService.hide();
                }
            });
    }

    public logout() {
        this.serverSocket.disconnect();
    }

    get isConnected(): boolean {
        return this._isConnected;
    }
    set isConnected(c: boolean) {
        this._isConnected = c;
    }

    ngOnDestroy() {
        console.log('authService Destroyed');
    }

}