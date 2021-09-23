import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../components/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiServerUrl}/profile/all`);
  }

  public addProfile(email: string, profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(
      `${this.apiServerUrl}/profile/add/users/${email}`,
      profile
    );
  }

  public deleteProfile(email: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServerUrl}/profile/delete/users/${email}`
    );
  }

  public updateProfile(email: string, profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(
      `${this.apiServerUrl}/profile/update/users/${email}`,
      profile
    );
  }

  public getProfileByUserEmail(email: string): Observable<Profile> {
    return this.http.get<Profile>(
      `${this.apiServerUrl}/profile/find/users/${email}`
    );
  }
}
