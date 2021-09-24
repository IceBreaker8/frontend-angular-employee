import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AuthSessionService } from 'src/app/services/auth-session.service';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css']
})
export class LoginMenuComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authSession: AuthSessionService
  ) {
    // do nothing
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit() {
    const username: string = this.myForm.get('name')?.value;
    const password: string = this.myForm.get('password')?.value;
    try {
      const user = await Auth.signIn(username, password)
        .then((user) => {
          this.route.navigate(['/employee']);
        })
        .catch((error) => {
          alert(error.message);
        });
    } catch (error) {
      alert(error.message);
      if (error['code'] == 'UserNotConfirmedException') {
        const username = this.myForm.get('name')?.value;
        const password = this.myForm.get('password')?.value;
        this.authSession.setPassword(password);
        this.authSession.setUsername(username);
        this.route.navigate(['/confirm-signup']);
      }
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
