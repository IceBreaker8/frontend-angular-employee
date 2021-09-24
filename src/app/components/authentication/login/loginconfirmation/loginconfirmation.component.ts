import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AuthSessionService } from 'src/app/services/auth-session.service';

@Component({
  selector: 'app-loginconfirmation',
  templateUrl: './loginconfirmation.component.html',
  styleUrls: ['./loginconfirmation.component.css']
})
export class LoginconfirmationComponent implements OnInit {
  myForm!: FormGroup;

  username?: string = '';

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authSession: AuthSessionService
  ) { }

  redirect(): void {
    this.route.navigate([''], { replaceUrl: true });
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      confirmationCode: ['', [Validators.required]]
    });
    if (this.authSession.getUsername() == '') {
      this.redirect();
      return;
    }
    if (this.authSession.getUsername() != '') {
      this.username = this.authSession.getUsername();
    }
    this.myForm = this.fb.group({
      name: [this.username, [Validators.required]],
      confirmationCode: ['', [Validators.required]]
    });
    this.myForm.controls['name'].disable();
  }

  onSubmit(): void {
    const username = this.myForm.get('name')?.value;
    const confirmationCode = this.myForm.get('confirmationCode')?.value;
    this.confirmSignUp(username, confirmationCode);
  }

  async confirmSignUp(username: string, code: string): Promise<void> {
    try {
      await Auth.confirmSignUp(username, code).catch((error) => {
        console.log(error.message);
      });
      this.loginUser(
        this.authSession.getUsername()!,
        this.authSession.getPassword()!
      );
      this.authSession.setUsername('');
      this.authSession.setPassword('');
    } catch (error) {
      alert(error.message);
    }
  }

  async loginUser(username: string, password: string): Promise<void> {
    try {
      const user = await Auth.signIn(username, password)
        .then((user) => {
          this.route.navigate(['/employee']);
        })
        .catch((err) => {
          // console.log(err.message);
        });
    } catch (error) {
      if (error['code'] == 'UserNotConfirmedException') {
        this.route.navigate(['/confirm-signup']);
      }
    }
  }

  async resendConfirmationCode(): Promise<void> {
    const username = this.myForm.get('name')?.value;
    try {
      await Auth.resendSignUp(username).catch((err) => {
        console.log(err.message);
      });
      alert('Code re-sent!');
    } catch (err) {
      //console.log('error resending code: ', err);
    }
  }

  // FORM STYLING FUNCTIONS

  public inputOnChange(
    label: any,
    input: any,
    smallError: any,
    smallEmpty: any,
    divName: string
  ) {
    if (this.myForm.get(divName)?.invalid) {
      input.style.borderColor = 'red';
      if (this.myForm.get(divName)?.value?.length == 0) {
        smallEmpty.style.display = 'block';
        smallError.style.display = 'none';
        smallEmpty.style.color = 'red';
      } else {
        smallError.style.display = 'block';
        smallEmpty.style.display = 'none';
      }

      smallError.style.color = 'red';
    } else {
      input.style.borderColor = 'green';
      smallError.style.display = 'none';
      smallEmpty.style.display = 'none';
    }
  }
}
