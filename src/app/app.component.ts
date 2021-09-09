
import { Component, OnInit } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { AuthSessionService } from './services/auth-session.service';
import { NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './services/user.service';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "employeeamangerapp"

  constructor() { }
  ngOnInit() {

  }

}


