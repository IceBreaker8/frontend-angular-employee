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




const routes: Routes = [
  { path: 'employee/update/:id', component: EmployeeFormComponent },
  { path: "employee/search/:subsname", component: EmployeesComponent },
  { path: 'employee/jobs/:jobTitle', component: EmployeesComponent },
  { path: 'employee/find/:id', component: EmployeeInfoComponent },
  { path: 'employee/add', component: EmployeeFormComponent },
  { path: 'employee', component: EmployeesComponent },
  { path: '**', redirectTo: "employee", pathMatch: "full" }
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeFormComponent,
    JobNavigatorComponent,
    SearchBarComponent,
    EmployeeInfoComponent
  ],
  imports: [

    RouterModule.forRoot(
      routes
    ),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
