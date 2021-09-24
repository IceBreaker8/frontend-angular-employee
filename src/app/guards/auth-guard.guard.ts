import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router
} from '@angular/router';
import { Auth } from 'aws-amplify';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  pathArray = [
    'login',
    'signup',
    'confirm-signup',
    'forgot-password',
    'reset-password'
  ];

  constructor(private route: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot
    //,state: RouterStateSnapshot
  ): Promise<boolean> {
    const path = route.routeConfig?.path?.toString();

    if (this.pathArray.includes(path!)) {
      //alert("faf");
      return Auth.currentAuthenticatedUser().then(
        (res) => {
          //alert("==1==>" + res);
          this.route.navigate([''], { replaceUrl: true });
          return false;
        },
        (error) => {
          //alert("==2==>" + error);
          return true;
        }
      );
    } else {
      return Auth.currentAuthenticatedUser().then(
        (res) => {
          //alert("===3=>" + res);
          return true;
        },
        (error) => {
          //alert("===4=>" + error);
          this.route.navigate([''], { replaceUrl: true });
          return false;
        }
      );
    }
  }
}
