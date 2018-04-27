import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Subscription } from 'rxjs/Subscription'

import { AuthenticationService } from '../shared/services/authentication.service'
import { User } from '../bo/user';
import { Data } from '../bo/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private errors: Data[] = [] ;
  private socketSubscription: Subscription;
  user : User = new User();

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    
  }

  ngOnInit() {

    if(localStorage.getItem('currentUser'))
    {
      this.router.navigate(['/admin/score']);
    }
  }

  onSubmit() { 

    this.authenticationService.authenticate(this.user,
      () =>{
        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.router.navigate(['/admin/score']);
      },
      err => {
        this.errors = err;
      }
    );
    
   }




}