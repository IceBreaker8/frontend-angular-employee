import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from 'aws-amplify';
import { Employee } from 'src/app/components/employee';
import { AuthSessionService } from 'src/app/services/auth-session.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../user';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees!: Employee[];
  userId?: number;
  //cm

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    public authSession: AuthSessionService,
    private userService: UserService
  ) { }

  jobTitle = '';
  subsname = '';

  ngOnInit() {
    Auth.currentAuthenticatedUser().then((res) => {
      this.userService.getUserByEmail(res.attributes.email).subscribe(
        (res: User) => {
          this.userId = res.id;
          this.route.params.subscribe(
            () => {
              const hasJobTitle: boolean =
                this.route.snapshot.paramMap.has('jobTitle');
              const hasName: boolean =
                this.route.snapshot.paramMap.has('subsname');
              if (hasJobTitle) {
                //console.log("job title");
                this.jobTitle = this.route.snapshot.params['jobTitle'];
                this.getEmployeesByJobTitle(this.jobTitle);
              } else if (hasName) {
                //console.log("subname");
                this.subsname = this.route.snapshot.params['subsname'];
                this.getEmployeesByNameContaining(this.subsname);
              } else {
                //console.log("all employees");
                this.getEmployees();
              }
            },
            (err) => {
              //console.log(err.message);
            }
          );
        },
        (error) => {
          //console.log(error.message);
        }
      );
    });
  }

  public getEmployeesByNameContaining(substring: string) {
    this.employeeService
      .getEmployeesByNameContaining(this.userId!, substring)
      .subscribe(
        (response: Employee[]) => {
          this.employees = response;
          if (response.length == 0) {
            // render not found template
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public getEmployeesByJobTitle(jobTitle: string) {
    this.employeeService
      .getEmployeesByJobTitle(this.userId!, jobTitle)
      .subscribe(
        (response: Employee[]) => {
          this.employees = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }
  public onDelete(employee: Employee) {
    if (confirm('Are you sure you want to delete ' + employee.name)) {
      this.employeeService.deleteEmployee(this.userId!, employee.id).subscribe(
        (response: Employee[]) => {
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public getEmployees(): void {
    this.employeeService.getEmployees(this.userId!).subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
