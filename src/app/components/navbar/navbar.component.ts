import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private amplifyService: AmplifyService) { }

  username?: undefined;

  ngOnInit(): void {

    this.amplifyService.authStateChange$.subscribe(
      res => {
        console.log(res.state);
        try {
          console.log(res.user.attributes.email);
          console.log(res.user);
          this.username = res.user.username;
          //console.log(res.user.username);
        } catch (err) {
          this.username = undefined;
        }

      }
    );
  }



}