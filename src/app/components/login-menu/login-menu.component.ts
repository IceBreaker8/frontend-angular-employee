import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css']
})
export class LoginMenuComponent implements OnInit {



  myForm!: FormGroup;



  constructor(private auth: AmplifyService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: ["", [
        Validators.required,

      ]],
      password: ["", [
        Validators.required,

      ]]

    });

  }


  async onSubmit() {
    let username: string = this.myForm.get("name")?.value;
    let password: string = this.myForm.get("password")?.value;
    try {
      const user = await Auth.signIn(username, password).then(user => {
        console.log(user);
        this.completeNewPassword(username, password);
        this.route.navigate(["/employee"]);
      }

      );
    } catch (error) {
      alert("ERROR");
    }
  }

  completeNewPassword(username: string, password: string) {
    Auth.signIn(username, password)
      .then(user => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
          Auth.completeNewPassword(
            user,               // the Cognito User Object
            password,       // the new password

          ).then(user => {
            // at this time the user is logged in if no MFA required
            console.log(user);
          }).catch(e => {
            console.log(e);
          });
        } else {
          // other situations
        }
      }).catch(e => {
        console.log(e);
      });
  }

}
