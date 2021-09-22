import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {



  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {


    this.myForm = this.fb.group({

      oldPassword: ["", [
        Validators.required
      ]],
      newPassword: ["", [
        Validators.required
      ]]

    });
  }
  async login(username: string, password: string) {

    try {
      const user = await Auth.signIn(username, password).then(user => {

      }
      ).catch(err => { });
    } catch (error) {
      alert(error.message);

    }
  }

  async onSubmit() {

    let oldPassword = this.myForm.get("oldPassword")?.value;
    let newPassword = this.myForm.get("newPassword")?.value;
    Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then(data => {
        alert("Password changed successfully!");
        this.route.navigate([""]);
      })
      .catch(err => {
        alert(err.message);
      });

  }

}
