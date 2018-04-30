import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../bo/user';
import { UserService } from '../shared/services/user.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ServerSocketService } from '../shared/services/server-socket.service';
import { Message } from '../bo/message';
import { Action } from '../bo/action.enum';
import { Data } from '../bo/data';
import { Subscription } from 'rxjs/Subscription';
import { UtilsService } from '../shared/services/utils.service';
import { MappingConfigurationService } from '../shared/services/mapping-configuration.service';
import { Status } from '../bo/status.enum';
import { SignUpService } from '../shared/services/sign-up.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
    model: User = new User();
    loading = false;
    private errors: Data[] = [] ;
    
    constructor(
        private router: Router,
      private signUpService : SignUpService,
    private alertService : AlertService) { }

    register() {

      this.signUpService.signUp(this.model, 
        () =>{
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);        
        },
        err => {
          this.errors = err;
        });
        
    }
}
