import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/components/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees!: Employee[];

  //cm

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute) { }

  jobTitle: string = "";
  subsname: string = "";

  ngOnInit() {

    this.route.params.subscribe(
      () => {

        const hasJobTitle: boolean = this.route.snapshot.paramMap.has("jobTitle");
        const hasName: boolean = this.route.snapshot.paramMap.has("subsname");
        if (hasJobTitle) {
          console.log("job title");
          this.jobTitle = this.route.snapshot.params["jobTitle"];
          this.getEmployeesByJobTitle(this.jobTitle);

        } else if (hasName) {
          console.log("subname");
          this.subsname = this.route.snapshot.params["subsname"];
          this.getEmployeesByNameContaining(this.subsname);

        } else {
          console.log("all employees");
          this.getEmployees();
        }
      }


    )

  }


  public getEmployeesByNameContaining(substring: string) {
    this.employeeService.getEmployeesByNameContaining(substring).subscribe(
      (response: Employee[]) => {
        this.employees = response;
        if (response.length == 0) {
          // render not found template
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);

      }
    )

  }


  public getEmployeesByJobTitle(jobTitle: string) {
    this.employeeService.getEmployeesByJobTitle(jobTitle).subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  public onDelete(employee: Employee) {
    if (confirm("Are you sure you want to delete " + employee.name)) {
      this.employeeService.deleteEmployee(employee.id).subscribe(
        (response: Employee[]) => {
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }

  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
