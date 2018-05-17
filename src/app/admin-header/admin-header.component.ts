import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router} from '@angular/router';
import { AdminService } from '../shared/services/admin.service';

/**
 * component to handle the header of the administration part.
 */
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {

  hidden : boolean = false;

  constructor(private authenticationService : AuthenticationService,  private router: Router, private adminService : AdminService) { }

  ngOnInit() {
    this.adminService.isHiddingHeader.subscribe( hide => {
      this.hidden = hide;
    });
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
  }

}
