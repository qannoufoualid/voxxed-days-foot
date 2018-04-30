import { Injectable } from '@angular/core';
import { ServerSocketService } from './server-socket.service';
import { UtilsService } from './utils.service';
import { MappingConfigurationService } from './mapping-configuration.service';
import { Data } from '../../bo/data';
import { Message } from '../../bo/message';
import { User } from '../../bo/user';
import { Action } from '../../bo/action.enum';
import { Subscription } from 'rxjs/Subscription';
import { Status } from '../../bo/status.enum';

@Injectable()
export class SignUpService {

  private socketSubscription: Subscription;

  constructor(private serverSocket: ServerSocketService, private utilsService : UtilsService, private mappingConfigurationService : MappingConfigurationService) {
    
  }

  signUp(user : User, callback : ()=>void, errorCallback : (errors : Data[])=>void) : void{
        this.serverSocket.connect();
        let m : Message = new Message(null, Action.SIGN_UP, [new Data("user", user)]);

        this.serverSocket.send(JSON.stringify(m));

        if(this.socketSubscription==null)
        this.socketSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {
            console.log("here");
            if(this.utilsService.isJson(message) && message != null)
            {
                let m :  Message = JSON.parse(message);
                let action = this.mappingConfigurationService.getActionName(Action.SIGN_UP_RESPONSE);
                let isLoaded = this.mappingConfigurationService.isLoaded();
                if(isLoaded && (m.action === action))
                    if(m.status === Status.SUCCEED){
                        callback();
                    }
                    else{
                        errorCallback(m.data);
                    }
            }
        });

  }

}
