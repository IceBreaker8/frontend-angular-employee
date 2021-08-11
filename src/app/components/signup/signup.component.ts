import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  myForm!: FormGroup;



  constructor(private auth: AmplifyService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: ["", [
        Validators.required,

      ]],
      password: ["", [
        Validators.required,

      ]],
      email: ["", [
        Validators.required,
        Validators.email
      ]]

    });

  }
  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  userExist(email: string) {


  }

  async onSubmit() {
    let username = this.myForm.get("name")?.value;
    let email = this.myForm.get("email")?.value;
    let password = this.myForm.get("password")?.value;
    //check for email uniqueness
    Auth.forgotPassword(email)
      .then(data => {
        alert("User already exists!");
        return;
      })
      .catch(err => {
        //user doesn't exist:

        this.signUp(email, username, password);

      });


  }

  async signUp(email: string, username: string, password: string) {
    try {
      //check if user exists

      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email

        }
      });
      this.route.navigate(["/confirm-signup"]);
    } catch (error) {
      //check if user already exists for example
      alert(error.message);
    }
  }
}