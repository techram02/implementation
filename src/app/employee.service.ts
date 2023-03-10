import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './Employee';
import { ResourceService } from './resource.service';
import { Converter } from './Coverter';

@Injectable({ providedIn: 'root' })
export class EmployeeService extends ResourceService<Employee> {
  constructor(http: HttpClient, converter: Converter) {
    super(
      http,
      Employee,
      'http://localhost:3000/employees',
      converter
    );
  }
}