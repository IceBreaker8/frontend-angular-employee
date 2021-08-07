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
import { LoginMenuComponent } from './components/login-menu/login-menu.component';
//AWS amplify cognito
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
import { AmplifyService } from 'aws-amplify-angular';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';

Amplify.configure(awsconfig);


// @TODO: MAKE SEARCH BAR UNFUNCTIONAL OUTSIDE OF EMPLOYEES COMPONENT
const routes: Routes = [
  { path: 'employee/update/:id', component: EmployeeFormComponent },
  { path: "employee/search/:subsname", component: EmployeesComponent },
  { path: 'employee/jobs/:jobTitle', component: EmployeesComponent },
  { path: 'employee/find/:id', component: EmployeeInfoComponent },
  { path: 'employee/add', component: EmployeeFormComponent },
  { path: 'employee', component: EmployeesComponent },
  { path: 'login', component: LoginMenuComponent },
  { path: '**', redirectTo: "employee", pathMatch: "full" }
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
    LogoutButtonComponent
  ],
  imports: [
    RouterModule.forRoot(
      routes
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService, AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
