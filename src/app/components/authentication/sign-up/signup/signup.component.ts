import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AuthSessionService } from 'src/app/services/auth-session.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  myForm!: FormGroup;



  constructor(private fb: FormBuilder, private route: Router,
    private authSession: AuthSessionService,
    private userService: UserService,
    private profileService: ProfileService) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      name: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("^[A-Za-z][A-Za-z0-9]*$")


      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)

      ]],
      email: ["", [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
      ]]

    });

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

      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email

        }
      }).catch(err => { });
      this.authSession.setPassword(password);
      this.authSession.setUsername(username);
      //call user service

      this.userService.addUser({ username, email }).subscribe(
        res => {

          this.profileService.addProfile(email, {}).subscribe(
            res => {

            }, error => {

            }
          )
        }, error => {

        }
      );

      this.route.navigate(["/confirm-signup"]);
    } catch (error) {
      //check if user already exists for example
      alert(error.message);
    }
  }

  //form styling

  //form styling
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