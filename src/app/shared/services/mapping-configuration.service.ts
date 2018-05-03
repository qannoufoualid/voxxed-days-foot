import { Injectable } from '@angular/core';
import { ServerSocketService } from './server-socket.service';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from './utils.service';
import { Message } from '../../bo/message';
import { Action } from '../../bo/action.enum';
import { Status } from '../../bo/status.enum';

/**
 * The service that extracts the info about the mapping configuration.
 */
@Injectable()
export class MappingConfigurationService {

  // the websocketSubscription.
  private socketSubscription: Subscription;
  //to hold the configuration
  private _config : any;

  constructor(private serverSocket : ServerSocketService, private utilsService : UtilsService) {

    if(this.socketSubscription==null)
        this.socketSubscription = this.serverSocket.getRecievedMessage().subscribe((message: string) => {
            if(this.utilsService.isJson(message) && message != null)
            {
                let m :  Message = JSON.parse(message);
                if(m.action === "GET_MAPPING_CONFIGURATION_RESPONSE")
                    if(m.status === "SUCCEED"){
                      this._config = m.data;
                    }
            }
        });
   }

   get config() : any{
     return this._config;
   }

   getActionName(action : Action) : string {
     let actions = this.config.actions;
     return actions[action];
   }

   getStatusName(status : Status) : string {
    return this.config.status[status];
  }

   isLoaded() : boolean{
     return this.config != null;
   }

   
   
}
