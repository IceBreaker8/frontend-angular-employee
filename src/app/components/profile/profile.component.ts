import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username?: string;
  email?: string;


  constructor(private auth: AmplifyService) { }

  ngOnInit(): void {
    try {
      Auth.currentAuthenticatedUser().then(
        res => {
          this.username = res.username;
          this.email = res.attributes.email;
        }
      )
    } catch (err) {
      alert(err.message);
    }


  }

}
