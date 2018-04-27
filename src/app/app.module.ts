import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminScoreListComponent } from './admin-score-list/admin-score-list.component';
import { AdminPlayersComponent } from './admin-players/admin-players.component';
import { ServerSocketService } from './shared/services/server-socket.service';
import { AdminService } from './shared/services/admin.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { ErrorListComponent } from './error-list/error-list.component';
import { UtilsService } from './shared/services/utils.service';
import { CanActivateViaAuthGuard } from './shared/services/can-activate-via-auth-guard.service';
import { MappingConfigurationService } from './shared/services/mapping-configuration.service';
import { SignUpComponent } from './sign-up/sign-up.component';

const appRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [
      CanActivateViaAuthGuard
    ],
    children: [
      {
        path: 'score',
        component: AdminScoreListComponent,
      },
      {
        path: 'players',
        component: AdminPlayersComponent,
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    PageNotFoundComponent,
    AdminHeaderComponent,
    AdminScoreListComponent,
    AdminPlayersComponent,
    ErrorListComponent,
    SignUpComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {}
    ),
    BrowserModule,
    FormsModule
  ],
  providers: [
    ServerSocketService,
    AuthenticationService,
    AdminService,
    UtilsService,,
    MappingConfigurationService,
    CanActivateViaAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
