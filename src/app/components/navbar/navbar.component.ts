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

        try {
          this.username = res.user.username;
          //console.log(res.user.username);
        } catch (err) {

          this.username = undefined;
        }

      }
    );
  }



}
