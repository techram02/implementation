import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EmployeeService } from './employee.service';
import { Employee } from './Employee';

@Injectable({ providedIn: 'root' })
export class EmployeeGenericService extends EmployeeService<Employee> {
  constructor( http: HttpClient) {
    super(
      http,
      Employee,
    'http://localhost:3000/employees'
    );
  }
}