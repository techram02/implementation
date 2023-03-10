import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-emp-rf',
  templateUrl: './create-emp-rf.component.html',
  styleUrls: ['./create-emp-rf.component.css']
})

export class CreateEmpRFComponent implements OnInit {
  isTyping: boolean = false;

  empForm!: FormGroup;
  employee: Partial<Employee> = {
    id: undefined,
    Name: '',
    Gender: '',
    Phone: '',
    Email: ''
  };

  update: boolean | undefined;
  constructor(private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.empForm = this.fb.group({
      Name: ['', Validators.required],
      Gender: ['Male'],
      Phone: ['', Validators.required],
      Email: ['', Validators.required]
    });

    this.route.paramMap.subscribe(
      param => {
        const empId = +param.get('id')!;
        if (empId) {
          this.getEmployee(empId);
          this.update = false;
        } else {
          this.update = true;
        }
      });
  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      (employee: Employee) => {
        this.setEmployeeModel(employee);
      },
      err => {
        console.error(err);
      }
    );
  }

  setEmployeeModel(employee: Partial<Employee>) {
    this.empForm.patchValue({
      Name: employee.Name,
      Gender: employee.Gender,
      Phone: employee.Phone,
      Email: employee.Email
    });
    this.employee.id = employee.id;
  }

  onsubmit() {
    if (this.employee.id) {
      this.mapFormValuesToEmployeeModel();
      this.employeeService.updateEmployee(this.employee, this.employee.id).subscribe(
        () => {
          this.router.navigate(['list']);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.mapFormValuesToEmployeeModel();
      this.employeeService.addEmployee(this.employee).subscribe(
        () => {
          this.empForm.reset();
        },
        err => {
          console.error(err);
        }
      );
    }
  }

  mapFormValuesToEmployeeModel() {
    this.employee.Name = this.empForm.value.Name;
    this.employee.Gender = this.empForm.value.Gender;
    this.employee.Phone = this.empForm.value.Phone;
    this.employee.Email = this.empForm.value.Email;
  }
  onChange(e:Event) {
    this.isTyping = true;
    setTimeout(() => {
      this.isTyping = false;
    }, 100);
  }
}
