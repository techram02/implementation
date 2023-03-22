import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './Employee';
import { ResourceModel } from './resource.model';
import { map } from 'rxjs/operators';
import { Converter } from './Coverter';
import { EmployeeService } from './employee.service';
@Injectable({
  providedIn: 'root'
})
export abstract class ResourceService<T extends ResourceModel<T>> {
  http!: any;
  converter: any;
  url:string;

  constructor(
    http : HttpClient, @Inject(String) private tConstructor: { new(m: Partial<T>, ...args: unknown[]): T },
    @Inject(String) url: string, converter: Converter) {
      this.http=http;
      this.converter=converter;
      this.url=url;

  }
  /*public getEmployees(): Observable<T[]> {
    return this.http
      .get<T[]>(`${this.url}`)
      .pipe(map((result) => result.map((i) => new this.tConstructor(i))));
  }*/
  public addEmployee(resource: Partial<T>): Observable<T> {
    const url4 = this.url;
    console.log("url 4 ", url4);
    return this.http
      .post(url4, resource)
      .pipe(map((result:Partial<T>) => new this.tConstructor(result)));
  } 
  public getEmployee(id: number): Observable<T> {
    // const url = this.url; // added
    // const url1 = url + '/id'; // added
    const url1 = `${this.url}/${id}`; // earlier commented
    console.log('url1 ',url1);
    return this.http.get(url1).pipe(
      map((data: any) =>  this.converter.convert(data)));
  }
  list(): Observable<T[]> {
    const url = this.url;
    return this.http.get(url).pipe(
      map((data: any[]) => data.map((item) => this.converter.convert(item)))
    );
  }
  public updateEmployee(resource: Partial<T>, id: number): Observable<T> {
    //  const url3 = '${this.url}/${id}';
      const url = this.url;
      const url3 = `${this.url}/${id}`;
      return this.http
     // .put(url3, resource)
      .put(url3, resource)
      .pipe(map((result: Partial<T>) => new this.tConstructor(result)));
  }
  public deleteEmployee(id: number): Observable<void> {
    const url2 = '${this.url}/${id}';
    return this.http.delete(url2);
  }
  getAllEmployees(): Observable<T[]> {
    let iVar = 0;
    const url = '${this.url}';
    return this.http.get(url).pipe(
      map((data: any[]) => data.map((item) => this.converter.convert(item)))
    );
  }
}


