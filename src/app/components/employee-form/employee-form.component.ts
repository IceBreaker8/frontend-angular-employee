import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit {

  myForm!: FormGroup;
  submitted: boolean = false;
  mode!: Mode;
  edit: boolean = false;
  constructor(private fb: FormBuilder, private service: EmployeeService, private route: ActivatedRoute) {
    this.service.setEdit(false);
    this.edit = this.service.getEdit();

  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ["", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]],
      jobTitle: ["", [
        Validators.required
      ]],
      email: ["", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
      ]],
      phone: [null, [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.maxLength(20),
        Validators.minLength(6)
      ]],
      conf: [false, [
        Validators.requiredTrue,
      ]]

    });

    if (this.route.snapshot.paramMap.has("id")) {
      this.service.setEdit(true);
      this.edit = this.service.getEdit();
      this.service.getEmployeeById(this.route.snapshot.params["id"]).subscribe(
        (res: Employee) => {
          this.myForm.get("name")?.setValue(res.name);
          this.myForm.get("jobTitle")?.setValue(res.jobTitle);
          this.myForm.get("email")?.setValue(res.email);
          this.myForm.get("phone")?.setValue(res.phone);
        }, (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }


  }
  public getName(): string {
    return this.myForm.get("name")?.value;
  }

  public getJobTitle(): string {
    return this.myForm.get("jobTitle")?.value;
  }

  public getEmail(): string {
    return this.myForm.get("email")?.value;
  }
  public getPhone(): string {
    return this.myForm.get("phone")?.value;
  }




  // function that take a div with {label, input, small tag for error message and small tag for empty error message}
  // event => whenever the user presses a key inside an input:
  // checks if the form if correct and make it green
  // if incorrect and set it to red with { error1: smallError: Input is not valid ; error2: smallEmpty: Input is empty}
  public inputOnChange(label: any, input: any, smallError: any, smallEmpty: any, divName: string) {
    if (this.myForm.get(divName)?.invalid) {
      input.style.borderColor = "red";
      if (this.myForm.get(divName)?.value?.length == 0) {
        smallEmpty.style.display = "block";
        smallError.style.display = "none";
        smallEmpty.style.color = "red";
      } else {
        smallError.style.display = "block";
        smallEmpty.style.display = "none";
      }

      smallError.style.color = "red";

    } else {
      input.style.borderColor = "green";
      smallError.style.display = "none";
      smallEmpty.style.display = "none";
    }


  }



  // submitting form
  public onSubmit() {
    if (this.edit) {
      alert(this.edit);
      this.service.updateEmployee(+this.route.snapshot.params["id"], this.myForm.value).subscribe(
        () => {
          this.submitted = true;
        }, (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    } else {
      this.service.addEmployee(this.myForm.value).subscribe(
        () => {
          this.submitted = true;

        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    }


  }


}
enum Mode {
  EDIT, ADD
}
export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  imageUrl: string;
  employeeCode: string;
}
