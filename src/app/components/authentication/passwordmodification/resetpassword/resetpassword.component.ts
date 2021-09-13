import { Component, OnInit } from '@angular/core';
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


  redirect() {
    this.route.navigate([''], { replaceUrl: true });
  }

  constructor(private fb: FormBuilder, private route: Router,
    private authSession: AuthSessionService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ["", [
        Validators.required,

      ]],
      confirmationCode: ["", [
        Validators.required,
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
      ]]

    });
    if (this.authSession.getUsername() == "") {
      this.redirect();
      return;
    }
    this.myForm = this.fb.group({
      name: [this.authSession.getUsername(), [
        Validators.required,

      ]],
      confirmationCode: ["", [
        Validators.required,
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)
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
    let code = this.myForm.get("confirmationCode")?.value;
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
  // FORM STYLING FUNCTIONS

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
}
