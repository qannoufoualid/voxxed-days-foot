import { Component } from '@angular/core';
import { ServerSocketService } from './shared/services/server-socket.service';
import { User } from './bo/user';
import { MappingConfigurationService } from './shared/services/mapping-configuration.service';
import { Action } from './bo/action.enum';
import { Status } from './bo/status.enum';
import { Message } from './bo/message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SFEIR-FOOT';

  constructor(private serverSocket: ServerSocketService, private mappingConfigurationService : MappingConfigurationService){ }
  
  ngOnInit() {
      this.serverSocket.connect();
      this.serverSocket.send( JSON.stringify(new Message(Status.SUCCEED, Action.GET_MAPPING_CONFIGURATION, [] )));
  }  


}
