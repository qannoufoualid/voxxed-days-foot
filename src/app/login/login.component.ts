import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service'
import { User } from '../bo/user';
import { AlertService } from '../shared/services/alert.service';
import { LoaderService } from '../shared/services/loader.service';

/**
 * Component of login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user : User = new User();

  constructor(private authenticationService: AuthenticationService, private router: Router,private alertService : AlertService) {
    
  }

  ngOnInit() {

    if(localStorage.getItem('currentUser'))
    {
      this.router.navigate(['/admin/score']);
    }
  }

  login() { 

    this.authenticationService.authenticate(this.user,
      (message) =>{
        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        localStorage.setItem('token', message.token);
        //Route the user to the admin page
        this.router.navigate(['/admin/score']);
      },
      err => {
        //Display errors.
        this.alertService.error(err);
      }
    );
   }
}