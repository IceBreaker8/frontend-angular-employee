import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';

export let loggedIn: boolean;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private amplifyService: AmplifyService) {}

  loggedIn?: boolean;
  ngOnInit(): void {
    try {
      this.amplifyService.authStateChange$.subscribe((res) => {
        this.loggedIn = res.state == 'signedIn' ? true : false;
        loggedIn = res.state == 'signedIn' ? true : false;
      });
    } catch (error) {
      //console.log(error.message);
    }
  }
}
