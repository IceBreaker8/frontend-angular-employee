import { DOCUMENT } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hub, Logger } from 'aws-amplify';
// Import the AuthService type from the SDK

import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { Route } from '@angular/compiler/src/core';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  username?: undefined;
  //loaded = false;

  constructor(public amplifyService: AmplifyService, private route: Router) {


  }
  title = "employeeamangerapp"


  ngOnInit() {

  }

}
