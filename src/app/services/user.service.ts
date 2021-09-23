import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../components/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/user/add`, user);
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/user/delete/${userId}`);
  }

  public updateUser(userId: number, user: User): Observable<void> {
    return this.http.put<void>(
      `${this.apiServerUrl}/user/update/${userId}`,
      user
    );
  }

  public getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/find/${userId}`);
  }

  public getUserByEmail(userEmail: string): Observable<User> {
    return this.http.get<User>(`${this.apiServerUrl}/user/search/${userEmail}`);
  }
}
