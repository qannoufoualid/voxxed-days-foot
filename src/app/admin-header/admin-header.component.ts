import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService,  private router: Router) { }

  ngOnInit() {
  }

  logout(){
   
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    localStorage.removeItem("currentUser");

  }

}