import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './Employee';
import { ResourceModel } from './resource.model';
import { map } from 'rxjs/operators';
import { Converter } from './Coverter';

@Injectable({
  providedIn: 'root'
})
export abstract class EmployeeService<T extends ResourceModel<T>> {

  constructor(
    private http: HttpClient,
    @Inject(String) private tConstructor: { new (m: Partial<T>, ...args: unknown[]): T},
    @Inject(String) protected url: string, private converter:Converter) 
    { 

    }

  /*public getEmployees(): Observable<T[]> {
    return this.http
      .get<T[]>(`${this.url}`)
      .pipe(map((result) => result.map((i) => new this.tConstructor(i))));
  }

  public addEmployee(resource: Partial<T>): Observable<T> {
    return this.http
      .post<T>(`${this.url}`, resource)
      .pipe(map((result) => new this.tConstructor(result)));
  }

  public getEmployee(id: number): Observable<T> {
    return this.http
      .get<T>(`${this.url}/${id}`)
      .pipe(map((result) => new this.tConstructor(result)));
  }*/

  
  
   public list(): Observable<Employee[]>() {
    const url = '${this.url}';
       return this.http.get(url).pipe(
       map((data: any[]) => data.map((item) => this.converter.convert(item)))
       );
      }

  /* public updateEmployee(resource: Partial<T>,id:number): Observable<T> {
    return this.http
      .put<T>(`${this.url}/${id}`, resource)
      .pipe(map((result) => new this.tConstructor(result)));
  }

  public deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getAllEmployees() {
    return this.http.get<T>('employeesdata.json')
        .toPromise()
        .then(res => <Employee[]>res.data)
        .then(data => { return data; });
}*/
}
