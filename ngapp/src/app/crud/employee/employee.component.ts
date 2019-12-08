import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getEmployeesObservable().subscribe(employees => {
      this.employees = [];
      employees.forEach(employee => {
        employee.deliveryEmployeesStr = employee.deliveryEmployees.map(
          deliveryEmployee => deliveryEmployee.deliveryId).join(", ");
        this.employees.push(employee);
      })
    });

    this.dataService.getEmployees();
  }

  onDeleteItem(event) {
    let id = event.path[2].getElementsByClassName("id-column")[0].innerHTML;
    this.dataService.deleteEmployee(id);
  }

}