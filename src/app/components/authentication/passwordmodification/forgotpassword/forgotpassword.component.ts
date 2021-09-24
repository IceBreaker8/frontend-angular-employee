import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AuthSessionService } from 'src/app/services/auth-session.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authSession: AuthSessionService
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
  onSubmit() {
    Auth.forgotPassword(this.myForm.get('name')?.value)
      .then((data) => {
        const username = this.myForm.get('name')?.value;
        this.authSession.setUsername(username);
        this.route.navigate(['/reset-password']);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  //form styling
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
