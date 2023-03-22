import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../Employee';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-emp-td',
  templateUrl: './create-emp-td.component.html',
  styleUrls: ['./create-emp-td.component.css']
})
export class CreateEmpTDComponent implements OnInit {

  @ViewChild('fm', { static: false }) form: any;

  employee: Partial<Employee> = {
    id: undefined,
    Name: '',
    Gender: 'Male',
    Phone: '',
    Email: '  '
  };
  update: boolean | undefined;
  isTyping: boolean = false;
  
  constructor(
    // private employeeService: EmployeeService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      param => {
        const empId = +param.get('id')!;
        if (empId) {
          this.update = false;
          this.getEmp(empId);
        } else {
          this.update = true;
        }
      }
    );
  }

  getEmp(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      (employee: Employee) => {
        this.employee = employee;
      },
      err => {
        console.error(err);
      }
    );
  }

  onsubmit() {
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee, this.employee.id).subscribe(
        () => {
          this.router.navigate(['list']);
        },
        err => {
          console.error(err);
        }
      );
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(
        () => {
          this.form.reset();
          this.employee = {
            id: undefined,
            Name: '',
            Gender: 'Male',
            Phone: '',
            Email: ''
          };
        },
        err => {
          console.error(err);
        }
      );
    }
  }
  onChange(e:Event) {
    this.isTyping = true;
    console.log('asdasd', this.isTyping);
    setTimeout(() => {
      this.isTyping = false;
    }, 100);
  }
}
