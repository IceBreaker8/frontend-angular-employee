import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { AuthSessionService } from 'src/app/services/auth-session.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  myForm!: FormGroup;



  constructor(private auth: AmplifyService, private fb: FormBuilder, private route: Router,
    private authSession: AuthSessionService) { }

  ngOnInit(): void {
    if (this.authSession.getUsername() == "") {
      this.route.navigate([""]);
      return;
    }
    this.myForm = this.fb.group({
      name: [this.authSession.getUsername(), [
        Validators.required,

      ]],
      code: ["", [
        Validators.required,
      ]],
      password: ["", [
        Validators.required,
      ]]

    });
    this.myForm.controls["name"].disable();

  }

  async login(username: string, password: string) {

    try {
      const user = await Auth.signIn(username, password).then(user => {
        this.route.navigate(["/employee"]);
      }
      );
    } catch (error) {
      alert(error.message);

    }
  }
  onSubmit() {
    let username = this.myForm.get("name")?.value;
    let code = this.myForm.get("code")?.value;
    let new_password = this.myForm.get("password")?.value;
    Auth.forgotPasswordSubmit(username, code, new_password)
      .then(data => {
        alert("Password changed successfully!");
        this.login(username, new_password);
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
