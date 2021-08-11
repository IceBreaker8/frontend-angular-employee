import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { AuthSessionService } from 'src/app/services/auth-session.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  myForm!: FormGroup;



  constructor(private auth: AmplifyService, private fb: FormBuilder, private route: Router,
    private authSession: AuthSessionService) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: ["", [
        Validators.required,

      ]]

    });

  }
  onSubmit() {
    Auth.forgotPassword(this.myForm.get("name")?.value)
      .then(data => {
        let username = this.myForm.get("name")?.value;
        this.authSession.setUsername(username);
        this.route.navigate(["/reset-password"]);
      })
      .catch(err => {
        alert(err.message);
      });
  }

}
