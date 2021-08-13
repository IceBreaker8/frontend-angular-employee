import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  async signOut() {
    try {
      await Auth.signOut().then
        (res => {
          window.location.href = "";

        });
    } catch (error) {
      console.log(error.message);
    }
  }

}
