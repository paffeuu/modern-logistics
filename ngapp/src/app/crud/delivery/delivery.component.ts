import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Delivery } from 'src/app/model/delivery';
import { DataService } from 'src/app/service/data.service';
import { FuelType } from 'src/app/model/fuel-type';
import { Car } from 'src/app/model/car';
import { Client } from 'src/app/model/client';
import { Employee } from 'src/app/model/employee';
import { DeliveryEmployee } from 'src/app/model/delivery-employee';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit, AfterViewChecked {

  deliveries: Delivery[];
  cars: Car[];
  clients: Client[];
  employees: Employee[];

  constructor(
    private dataService: DataService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.dataService.getDeliveriesObservable().subscribe(deliveries => {
      this.deliveries = deliveries;
      this.completeFuelType();
    });

    this.dataService.getCarsObservable().subscribe(cars => 
    {
      this.cars = cars;
      this.completeCarVINs();
    });

    this.dataService.getClientsObservable().subscribe(clients =>
    {
      this.clients = clients;
      setTimeout(() => this.completeClientNames(), 100);
      
    });

    this.dataService.getEmployeesObservable().subscribe(employees => {
      this.employees = employees;
      setTimeout(() => {
        this.completeEmployeeNames();
        this.completeEmployeeNamesOnList();
        this.completeInitialStateOfEmployeeNames();
      }, 100);
     })

  }

  ngAfterViewInit() {
    this.dataService.getDeliveries();
    this.dataService.getClients();
    this.dataService.getEmployees();
    this.dataService.getCars();
  }

  ngAfterViewChecked() {
    this.checkPermissionLevel();
  }

  onCreateItem(event) {
    let row = this.findRow(event);
    let delivery = this.collectAllDataAboutDelivery(row);
    this.dataService.postDelivery(delivery);
    this.cleanCreateRow(row);
    this.getClients();
  }

  onEditItem(event) {
    let row = this.findRow(event);
    let inputs = row.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs.item(i).style.display = "block";
    }
    let button = row.getElementsByTagName("button");
    button.item(0).style.display = "block";
    let ul  = row.getElementsByTagName("ul");
    ul.item(0).style.display = "block";
    let ulInputs = ul.item(0).getElementsByTagName("input");
    for (let i = 0; i < ulInputs.length; i++) {
      ulInputs.item(i).style.display = "inline";
    }
    this.getCars();
    this.getClients();
    this.getEmployees();
  }

  onDeleteItem(event) {
    let id = this.findRowId(event);
    this.dataService.deleteDelivery(id);
  }

  onCommitButtonClick(event) {
    let id = this.findRowId(event);
    let row = this.findRow(event);
    let delivery = this.collectAllDataAboutDelivery(row);
    delivery.id = id;
    this.dataService.putDelivery(id, delivery);
    this.getClients();
    this.getEmployees();
  }

  collectAllDataAboutDelivery(row): Delivery {
    let delivery = new Delivery();
    if (this.getElementFromInputByFieldName("carvin", row)) {
      delivery.carVIN = this.cars.find(car => car.vin == this.getElementFromInputByFieldName("carvin", row)).vin;
    } else {
      delivery.carVIN = this.getElementFromParagraphByFieldName("carvin", row);
    }
    delivery.entryDate = this.getElementFromInputByFieldName("entrydate", row);
    delivery.fuelSpent = this.getElementFromInputByFieldName("fuelspent", row);
    delivery.kmTravelled = this.getElementFromInputByFieldName("kmtravelled", row);
    if (this.getElementFromInputByFieldName("clientid", row)) {
      delivery.clientID = this.clients.find(client => client.name == this.getElementFromInputByFieldName("clientid", row)).id;
    } else {
      delivery.clientID = this.clients.find(client => client.name == this.getElementFromParagraphByFieldName("clientid", row)).id;
    }
    this.collectDataAboutDeliveryEmployees(delivery, row);
    return delivery;
  }

  collectDataAboutDeliveryEmployees(delivery, row) {
    delivery.deliveryEmployees = [];
    let employeeDeliveryInputs = row.getElementsByClassName("input-employees");
    for (let i = 0; i < employeeDeliveryInputs.length; i++) {
      let item = employeeDeliveryInputs.item(i);
      if (!item.checked) {
        continue;
      }
      let employeeId = parseInt(item.classList.item(1).split("-")[2]);
      let deliveryEmployee = new DeliveryEmployee();
      deliveryEmployee.deliveryId = delivery.id;
      deliveryEmployee.employeeId = employeeId;
      delivery.deliveryEmployees.push(deliveryEmployee);
    }
  }

  completeFuelType() {
    this.deliveries.forEach(delivery => {
      delivery.fuelTypePolishString = FuelType[delivery.fuelType];
    })
  }

  completeCarVINs() {
    let carVINsList = document.getElementsByClassName("carvins");
    for (let i = 0; i < carVINsList.length; i++) {
      let carVINs = carVINsList.item(i);
      carVINs.innerHTML = "";
      this.cars.forEach(car => {
        let carVIN = car.vin;
        let option = document.createElement('option');
        option.value = carVIN;   
        carVINs.appendChild(option);
      });
    } 
  }

  completeClientNames() {
    let clientNamesCreate = document.getElementById("clientnames1");
    clientNamesCreate.innerHTML = "";
    this.clients.forEach(client => {
      let clientName = client.name;
      let option = document.createElement('option');
      option.value = clientName;
      clientNamesCreate.appendChild(option);
    });
    
    this.deliveries.forEach(delivery => {
      let client = this.clients.find(client => client.id == delivery.clientID)
      if (client) {
        delivery.clientName = client.name;
      }
      let clientNames = document.getElementById("clientnames2");
      clientNames.innerHTML = "";
      this.clients.forEach(client => {
        let clientName = client.name;
        let option = document.createElement('option');
        option.value = clientName;
        clientNames.appendChild(option);});
      });
  }

  completeEmployeeNames() {
    this.deliveries.forEach(delivery => {
      let employeeNames = [];
      delivery.deliveryEmployees.forEach(deliveryEmployee => {
        let employee = this.employees.find(employee => employee.id == deliveryEmployee.employeeId);
        if (employee) {
          employeeNames.push(employee.surname);
        }
      });
      delivery.employeeSurnames = employeeNames.join(", ");
    });
  }

  completeEmployeeNamesOnList() {
    let inputEmployees = document.getElementsByClassName("input-employees");
    for (let i = 0; i < inputEmployees.length; i++) {
      let item = inputEmployees.item(i);
      let employeeId = parseInt(item.classList.item(1).split("-")[2]);
      let employee = this.employees.find(employee => employee.id == employeeId);
      if (employee) {
        item.parentElement.children[1].innerHTML = employee.surname;
      }
    }
  }

  completeInitialStateOfEmployeeNames() { 
    let rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; i++) {
      let row = rows.item(0);
      let deliveryId = row.getElementsByClassName("id-column").item(0).children[0].children[0].textContent;
      let deliveryEmployees = this.deliveries.find(delivery => delivery.id == parseInt(deliveryId)).deliveryEmployees;
      let employeeIds = deliveryEmployees.map(deliveryEmployee => deliveryEmployee.employeeId);
      employeeIds.forEach(employeeId => {
        let checkbox:any = document.getElementsByClassName("input-employees-" + employeeId).item(0);
        if (checkbox) {
          checkbox.checked = true;
        }
      });
    }   
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

  getElementFromInputByFieldName(name, row) {
    return row.getElementsByClassName("input-" + name)[0].value;
  }

  getElementFromParagraphByFieldName(name, row) {
    return row.getElementsByClassName("paragraph-" + name)[0].textContent;
  }

  getCars() {
    this.dataService.getCars();
  }

  getClients() {
    this.dataService.getClients();
  }

  getEmployees() {
    this.dataService.getEmployees();
  }

  checkPermissionLevel() {
    let permissionLevel = this.authenticationService.getUserRole();
    let restrictedItems = document.getElementsByClassName("level-3");
    for (let i = 0; i < restrictedItems.length; i++) {
      let item = restrictedItems.item(i) as HTMLElement;
      if (!item.classList.contains("level-" + permissionLevel)) {
        item.style.display = "none";
      }
    }
  }

}
