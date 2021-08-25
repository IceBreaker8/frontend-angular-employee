import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Auth } from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  pathArray = new Array("login", "signup", "confirm-signup", "forgot-password", "reset-password")

  constructor(private route: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    let path = route.routeConfig?.path?.toString();

    if (this.pathArray.includes(path!)) {
      //alert("faf");
      return Auth.currentAuthenticatedUser().then(
        res => {
          //console.log(res);
          this.route.navigate([""]);
          return false;
        },
        error => {
          //console.log(error);
          return true;
        }
      )
    } else {
      return Auth.currentAuthenticatedUser().then(
        res => {
          //console.log(res);
          return true;
        },
        error => {
          //console.log(error);
          this.route.navigate([""]);
          return false;
        }
      )
    }

  }

}
