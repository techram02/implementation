import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResourceModel } from './resource.model';
import { Converter } from './Coverter';


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


  public addEmployee(resource: Partial<T>): Observable<T> {
    const url = this.url;
    return this.http
      .post(url, resource)
      .pipe(map((result:Partial<T>) => new this.tConstructor(result)));
  }


  public getEmployee(id: number): Observable<T> {
    const url = `${this.url}/${id}`;
    return this.http.get(url).pipe(
      map((data: any) =>  this.converter.convert(data)));
  }


  getEmployeeList(): Observable<T[]> {
    const url = this.url;
    return this.http.get(url).pipe(
      map((data: any[]) => data.map((item) => this.converter.convert(item)))
    );
  }


  public updateEmployee(resource: Partial<T>, id: number): Observable<T> {
    const url = `${this.url}/${id}`;
    return this.http
      .put(url, resource)
      .pipe(map((result: Partial<T>) => new this.tConstructor(result)));
  }


  public deleteEmployee(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }
}


