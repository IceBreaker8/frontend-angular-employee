import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css']
})
export class EmployeeInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: EmployeeService) { }



  ngOnInit(): void {
    let id: number = this.route.snapshot.params["id"];
    this.service.findEmployee(id).subscribe(
      (response: Employee) => {
        console.log(response);
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
