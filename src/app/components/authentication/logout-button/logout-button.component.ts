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


        });
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

}
