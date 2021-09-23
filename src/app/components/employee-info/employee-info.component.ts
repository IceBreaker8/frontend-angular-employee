import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Auth } from 'aws-amplify';
import { EmployeeService } from 'src/app/services/employee.service';
import { UserService } from 'src/app/services/user.service';
import { Employee } from '../employee';
import { User } from '../user';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: EmployeeService,
    private userService: UserService
  ) {}

  employee!: Employee;
  userId?: number;
  ngOnInit(): void {
    Auth.currentAuthenticatedUser().then(
      (res) => {
        this.userService
          .getUserByEmail(res.attributes.email)
          .subscribe((res) => {
            this.userId = res.id;
            const id: number = this.route.snapshot.params['id'];
            this.service.getEmployeeById(this.userId!, id).subscribe(
              (response: Employee) => {
                this.employee = response;
              },
              (error: HttpErrorResponse) => {
                alert(error);
              }
            );
          });
      },
      (error) => {
        //console.log(error.message);
      }
    );
  }
}
