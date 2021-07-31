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
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [
  { path: 'employee/update/:id', component: EmployeeFormComponent },
  { path: "employee/search/:subsname", component: EmployeesComponent },
  { path: 'employee/jobs/:jobTitle', component: EmployeesComponent },
  { path: 'employee/find/:id', component: EmployeeInfoComponent },
  { path: 'employee/add', component: EmployeeFormComponent },
  { path: 'employee', component: EmployeesComponent },
  { path: 'login', component: LoginComponent },
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
    LoginComponent,
  ],
  imports: [

    RouterModule.forRoot(
      routes
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormBuilder
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
