import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private amplifyService: AmplifyService) { }

  loggedIn?: boolean;
  ngOnInit(): void {

    this.amplifyService.authStateChange$.subscribe(
      res => {
        try {
          Auth.currentAuthenticatedUser().then(
            res => {
              this.loggedIn = true;
            },
            error => {
              this.loggedIn = false;
            }
          )
          //console.log(res.user.username);
        } catch (err) {

        }

      }
    );
  }



}
