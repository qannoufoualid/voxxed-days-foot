import { Component } from '@angular/core';
import { ServerSocketService } from './shared/services/server-socket.service';
import { User } from './bo/user';
import { MappingConfigurationService } from './shared/services/mapping-configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SFEIR-FOOT';

  constructor(private serverSocket: ServerSocketService, private mappingConfigurationService : MappingConfigurationService){ }
  
  ngOnInit() {  
    if (localStorage.getItem('currentUser'))    
    {
      let currentUser : User = JSON.parse(localStorage.getItem('currentUser'));
      this.serverSocket.connect(currentUser);
    }   
  }  


}
