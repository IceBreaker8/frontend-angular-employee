import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthSessionService {


  username: string = "";
  password: string = "";

  constructor() { }



  setUsername(username: string) {
    this.username = username;
  }
  setPassword(password: string) {
    this.password = password;
  }
  getUsername() {
    return this.username;
  }
  getPassword() {
    return this.password;
  }
}
