import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../bo/user';
import { UserService } from '../shared/services/user.service';
import { AuthenticationService } from '../shared/services/authentication.service';


@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class SignUpService {
    model: User = new User();
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private authenticationService : AuthenticationService,
        private alertService: AlertService) { }

    register() {

        this.authenticationService.authenticate(this.user,
          params,
          () =>{
            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(this.user));
            this.router.navigate(['/admin/score']);
          },
          err => {
            this.errors = err;
          }
        );
        
       

        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
