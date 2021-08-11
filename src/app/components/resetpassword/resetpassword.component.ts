import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  myForm!: FormGroup;



  constructor(private auth: AmplifyService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: ["", [
        Validators.required,

      ]],
      code: ["", [
        Validators.required,
      ]],
      password: ["", [
        Validators.required,
      ]]

    });

  }
  onSubmit() {
    let username = this.myForm.get("name")?.value;
    let code = this.myForm.get("code")?.value;
    let new_password = this.myForm.get("password")?.value;
    Auth.forgotPasswordSubmit(username, code, new_password)
      .then(data => {
        this.route.navigate(["/login"]);
      })
      .catch(err => {
        alert(err.message);
      });
  }
  resendCode() {
    Auth.forgotPassword(this.myForm.get("name")?.value)
      .then(data => {

        alert("Code re-sent!");
      })
      .catch(err => {
        alert(err.message);
      });
  }

}
