import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  message = '';
  Employees!: Partial<Employee>[];
  selectedRows: any[] | undefined;
  @Input() displayCheckbox = true;
  constructor(private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getAllEmps();
  }

  getAllEmps() {
    this.message = 'Loading..';
    this.employeeService.list().subscribe(
      (employees: Employee[]) => {
        this.Employees = employees;
        console.log("employee[2].ID " + employees[2].id);
        this.message = '';
      },
      err => {
        this.message = err.message;
        console.error(err);
      }
    );
  }

  OnEditClick(type: string, id: number) {
    if (type === 'TDF') {
      this.router.navigate(['edittd', id]);
    } else if (type === 'RF') {
      this.router.navigate(['editrf', id]);
    }
  }

  deleteEmp(id: number, event: Event) {
    this.confirmationService.confirm({
      target: event?.target as EventTarget,
      message: `Are you sure you want to Delete?`,
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.employeeService.deleteEmployee(id).subscribe((res: any) => {
          this.messageService.add({
            severity: "success",
            summary: "Deleted!",
            detail: "Employee Deleted Successfully"
          });
          this.getAllEmps();
        },
          err => {
            console.error(err);
          }
        );

      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Cancelled!",
          detail: "Employee not deleted"
        });
      }
    });
  }
  editEmp(id: number) {
    console.log("ID is " + id);
    this.employeeService.getEmployee(id).subscribe((res: any) => {
      this.router.navigate([`../editrf/` + id], { relativeTo: this.route });
    })
  }
}
