
import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { AuthSessionService } from './services/auth-session.service';
import { NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  username?: undefined;
  //loaded = false;
  title = "employeeamangerapp"
  //detect reloading page
  subscription: Subscription;

  constructor(public amplifyService: AmplifyService, private route: Router,
    public authSession: AuthSessionService) {
    //detect reloading: empty authSession service and change the route
    this.subscription = route.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !route.navigated;
        let routeString = event.url;
        if ((browserRefresh && routeString.includes("/confirm-signup")) ||
          (browserRefresh && routeString.includes("/reset-password"))) {
          this.authSession.setPassword("");
          this.authSession.setUsername("");
          window.location.href = "";

        }

      }
    });

  }

  pathArray = ["/login", "/signup", "/forgot-password"]
  ngOnInit() {
    //detect changing components: empty authSession service and change the route
    this.route.events
      .subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            let routeString = event.url;
            if (this.pathArray.indexOf(routeString) > -1) {
              if (this.authSession.getUsername() != "") {
                window.location.href = "";
              }
            }
            if (!routeString.includes("/confirm-signup") && !routeString.includes("/reset-password")) {
              this.authSession.setPassword("");
              this.authSession.setUsername("");

            }

          }
        });
  }

}


