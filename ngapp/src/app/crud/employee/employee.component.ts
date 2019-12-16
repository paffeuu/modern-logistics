import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data.service';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, AfterViewChecked {

  employees: Employee[];

  constructor(
    private dataService: DataService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.dataService.getEmployeesObservable().subscribe(employees => {
      this.employees = employees;
      this.completeDeliveryIds();
    });

    this.dataService.getEmployees();
  }

  ngAfterViewChecked() {
    this.checkPermissionLevel();
  }

  onCreateItem(event) {
    let row = this.findRow(event);
    let newEmployee = this.collectAllDataAboutEmployee(row);
    this.dataService.postEmployee(newEmployee);
    this.cleanCreateRow(row);
  }

  onEditItem(event) {
    let row = this.findRow(event);
    let inputs = row.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs.item(i).style.display = "block";
    }
    let button = row.getElementsByTagName("button");
    button.item(0).style.display = "block";
  }

  onDeleteItem(event) {
    let id = this.findRowId(event);
    this.dataService.deleteEmployee(id);
  }

  onCommitButtonClick(event) {
    let id = this.findRowId(event);
    let row = this.findRow(event);
    let employee = this.collectAllDataAboutEmployee(row);
    employee.id = id;
    this.dataService.putEmployee(id, employee);
  }

  collectAllDataAboutEmployee(row): Employee {
    let employee = new Employee();
    employee.pesel = this.getElementFromInputByFieldName("pesel", row);
    employee.forename = this.getElementFromInputByFieldName("forename", row);
    employee.surname = this.getElementFromInputByFieldName("surname", row);
    return employee;
  }

  completeDeliveryIds() {
    this.employees.forEach(employee => {
      employee.deliveryEmployeesStr = employee.deliveryEmployees.map(
        deliveryEmployee => deliveryEmployee.deliveryId).join(", ");
    })
  }

  getElementFromInputByFieldName(name, row) {
    return row.getElementsByClassName("input-" + name)[0].value;
  }
  
  findRowId(event) {
    return event.path[4].getElementsByClassName("id-column")[0].children[0].textContent;
  }

  findRow(event) {
    return event.path[4];
  }

  cleanCreateRow(row) {
    let inputs = row.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs.item(i).value = "";  
    }
  }

  checkPermissionLevel() {
    let permissionLevel = this.authenticationService.getUserRole();
    let restrictedItems = document.getElementsByClassName("restricted");
    for (let i = 0; i < restrictedItems.length; i++) {
      let item = restrictedItems.item(i) as HTMLElement;
      if (!item.classList.contains("level-" + permissionLevel)) {
        item.style.display = "none";
      }
    }
  }
}
