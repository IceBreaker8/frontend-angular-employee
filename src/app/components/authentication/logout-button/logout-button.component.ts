import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  async signOut() {
    try {
      await Auth.signOut().then
        (res => {
          this.route.navigate([''], { replaceUrl: true });

        });
    } catch (error) {
      //console.log(error.message);
    }
  }

}
