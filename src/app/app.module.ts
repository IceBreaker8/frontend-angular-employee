import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeService } from './services/employee.service';



import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { JobNavigatorComponent } from './components/job-navigator/job-navigator.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';


// Import the module from the SDK
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginMenuComponent } from './components/authentication/login/login-menu/login-menu.component';
//AWS amplify cognito
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { AmplifyService, ConfirmSignInComponent } from 'aws-amplify-angular';
import { SignupComponent } from './components/authentication/sign-up/signup/signup.component';
import { LoginconfirmationComponent } from './components/authentication/login/loginconfirmation/loginconfirmation.component';
import { ForgotpasswordComponent } from './components/authentication/passwordmodification/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/authentication/passwordmodification/resetpassword/resetpassword.component';
import { LoginButtonComponent } from './components/authentication/login/login-button/login-button.component';
import { LogoutButtonComponent } from './components/authentication/logout-button/logout-button.component';
import { ChangepasswordComponent } from './components/authentication/passwordmodification/changepassword/changepassword.component';
import { ChangepasswordbuttonComponent } from './components/authentication/passwordmodification/changepasswordbutton/changepasswordbutton.component';
import { ForgotpasswordbuttonComponent } from './components/authentication/passwordmodification/forgotpasswordbutton/forgotpasswordbutton.component';
import { SignupButtonComponent } from './components/authentication/sign-up/signup-button/signup-button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserService } from './services/user.service';
import { ProfileService } from './services/profile.service';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

Amplify.configure(awsconfig);


// @TODO: MAKE SEARCH BAR UNFUNCTIONAL OUTSIDE OF EMPLOYEES COMPONENT
const routes: Routes = [
  { path: 'employee/update/:id', component: EmployeeFormComponent, canActivate: [AuthGuardGuard] },
  { path: "employee/search/:subsname", component: EmployeesComponent, canActivate: [AuthGuardGuard] },
  { path: 'employee/jobs/:jobTitle', component: EmployeesComponent, canActivate: [AuthGuardGuard] },
  { path: 'employee/find/:id', component: EmployeeInfoComponent, canActivate: [AuthGuardGuard] },
  { path: 'employee/add', component: EmployeeFormComponent, canActivate: [AuthGuardGuard] },
  { path: 'employee', component: EmployeesComponent, canActivate: [AuthGuardGuard] },
  //home
  { path: 'home', component: HomeComponent },
  //authentication routes
  { path: 'login', component: LoginMenuComponent, canActivate: [AuthGuardGuard] },
  { path: "signup", component: SignupComponent, canActivate: [AuthGuardGuard] },
  { path: "confirm-signup", component: LoginconfirmationComponent, canActivate: [AuthGuardGuard] },
  { path: "forgot-password", component: ForgotpasswordComponent, canActivate: [AuthGuardGuard] },
  { path: "reset-password", component: ResetpasswordComponent, canActivate: [AuthGuardGuard] },
  { path: "change-password", component: ChangepasswordComponent, canActivate: [AuthGuardGuard] },
  //profile routes
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuardGuard] },
  { path: '**', redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeFormComponent,
    JobNavigatorComponent,
    SearchBarComponent,
    EmployeeInfoComponent,
    NavbarComponent,
    LoginMenuComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SignupComponent,
    SignupButtonComponent,
    LoginconfirmationComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    ChangepasswordComponent,
    ForgotpasswordbuttonComponent,
    ChangepasswordbuttonComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(
      routes
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService, AmplifyService, UserService, ProfileService, AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
