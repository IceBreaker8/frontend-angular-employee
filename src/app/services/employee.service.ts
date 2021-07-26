import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
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
  public getEmployeesByNameContaining(substring: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/search/${substring}`);
  }

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }
  public addEmployee(employee: Employee): Observable<Employee> {

    return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
  }

  public getEmployeesByJobTitle(jobTitle: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/jobs/${jobTitle}`);
  }
  public getEmployeeById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiServerUrl}/employee/find/${employeeId}`);
  }
  public updateEmployee(employeeId: number, employee: Employee): Observable<void> {

    return this.http.put<void>(`${this.apiServerUrl}/employee/update/${employeeId}`, employee);
  }

  public deleteEmployee(employeeId: number): Observable<Employee[]> {
    return this.http.delete<Employee[]>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
  }
  public findEmployee(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiServerUrl}/employee/find/${employeeId}`);
  }

}

