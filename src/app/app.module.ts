import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DeviceService } from './device/deviceService';
import { DeviceComponent } from './device/device.component';
import { AuthService} from './auth/auth.service';
import { LoginComponent} from './auth/login.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// import { MaterialModule } from '@angular/material';

import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import {MatCheckboxModule,MatRadioModule,MatSelectModule, MatInputModule,
  MatToolbarModule, MatSidenavModule,MatButtonModule,MatIconModule,MatCardModule,
MatExpansionModule,MatListModule,MatMenuModule,MatChipsModule,MatDividerModule,
MatFormFieldModule, MatGridListModule, MatTabsModule, MatSnackBarModule,
MatProgressSpinnerModule, MatTableModule,MatPaginatorModule} from '@angular/material';
// import { HTTP_PROVIDERS } from '@angular/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import {APP_BASE_HREF} from '@angular/common';
import { AppComponent } from './app.component';
import { StatusComponent } from './status/status.component';
import { EnsureAuthenticated } from './auth/ensure-authenticated.service';
import { LoginRedirect } from './auth/login-redirect.service';
import { BaseComponent } from './base/base.component';
import { UserComponent } from './user/users';



@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    LoginComponent,
    StatusComponent,
    BaseComponent,
    UserComponent

  ],
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, canActivate: [LoginRedirect] },
      { path: 'status', component: StatusComponent, canActivate:[EnsureAuthenticated] },
      { path: 'devices', component: DeviceComponent, canActivate:[EnsureAuthenticated]},
      { path: '', component: BaseComponent, canActivate:[LoginRedirect]},

    ]),
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatGridListModule,
    MatTabsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule

  ],
  providers: [DeviceService, AuthService,{provide: APP_BASE_HREF, useValue : '/' },EnsureAuthenticated,LoginRedirect],
  bootstrap: [AppComponent]
})
export class AppModule { }
