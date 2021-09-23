import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../components/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  edit!: boolean;
  public getEdit() {
    return this.edit;
  }
  public setEdit(value: boolean) {
    this.edit = value;
  }
  public getEmployeesByNameContaining(
    userId: number,
    substring: string
  ): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.apiServerUrl}/employee/search/users/${userId}/employees/${substring}`
    );
  }

  constructor(private http: HttpClient) {}

  public getEmployees(userId: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.apiServerUrl}/employee/get/users/${userId}/all`
    );
  }
  public addEmployee(userId: number, employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      `${this.apiServerUrl}/employee/post/users/${userId}`,
      employee
    );
  }

  public getEmployeesByJobTitle(
    userId: number,
    jobTitle: string
  ): Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.apiServerUrl}/employee/jobs/users/${userId}/employees/${jobTitle}`
    );
  }
  public getEmployeeById(
    userId: number,
    employeeId: number
  ): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.apiServerUrl}/employee/find/users/${userId}/employees/${employeeId}`
    );
  }
  public updateEmployee(
    userId: number,
    employeeId: number,
    employee: Employee
  ): Observable<void> {
    return this.http.put<void>(
      `${this.apiServerUrl}/employee/update/users/${userId}/employees/${employeeId}`,
      employee
    );
  }

  public deleteEmployee(
    userId: number,
    employeeId: number
  ): Observable<Employee[]> {
    return this.http.delete<Employee[]>(
      `${this.apiServerUrl}/employee/delete/users/${userId}/employees/${employeeId}`
    );
  }
}
