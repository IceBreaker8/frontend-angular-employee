import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-loginconfirmation',
  templateUrl: './loginconfirmation.component.html',
  styleUrls: ['./loginconfirmation.component.css']
})
export class LoginconfirmationComponent implements OnInit {

  myForm!: FormGroup;



  constructor(private auth: AmplifyService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: ["", [
        Validators.required

      ]],
      confirmationCode: ["", [
        Validators.required,

      ]]

    });

  }

  onSubmit() {
    let username = this.myForm.get("name")?.value;
    let confirmationCode = this.myForm.get("confirmationCode")?.value;
    this.confirmSignUp(username, confirmationCode);
  }


  async confirmSignUp(username: string, code: string) {
    try {
      await Auth.confirmSignUp(username, code);
      this.route.navigate(["/login"]);
    } catch (error) {
      alert(error.message);
    }
  }

  async loginUser(username: string, password: string) {
    try {
      const user = await Auth.signIn(username, password).then(user => {
        //console.log(user);
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.completeNewPassword(username, password);
        }
        this.route.navigate(["/employee"]);
      }

      );
    } catch (error) {
      if (error["code"] == "UserNotConfirmedException") {
        this.route.navigate(["/confirm-signup"]);
      }
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
            //console.log(user);
          }).catch(e => {

          });
        } else {
          // other situations
        }
      }).catch(e => {

      });
  }

  async resendConfirmationCode() {
    let username = this.myForm.get("name")?.value;
    try {
      await Auth.resendSignUp(username);
      alert("Code sent successfully!");
    } catch (err) {
      //console.log('error resending code: ', err);
    }
  }

}