import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/model/delivery';
import { DataService } from 'src/app/service/data.service';
import { FuelType } from 'src/app/model/fuel-type';
import { Car } from 'src/app/model/car';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  deliveries: Delivery[] = [];
  cars: Car[] = [];
  clients: Client[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDeliveriesObservable().subscribe(deliveries => {
      this.deliveries = [];
      deliveries.forEach(delivery => {
        delivery.fuelTypePolishString = FuelType[delivery.fuelType];
        delivery.deliveryEmployeesStr = delivery.deliveryEmployees.map(
          deliveryEmployee => deliveryEmployee.employeeId).join(", ");
        this.deliveries.push(delivery);
      })
    });

    this.dataService.getCarsObservable().subscribe(cars => 
      {
        this.cars = cars;
        let carVINs = document.getElementById("carvins");
        carVINs.innerHTML = "";
        this.cars.forEach(car => {
          let carVIN = car.vin;
          let option = document.createElement('option');
          option.value = carVIN;   
          carVINs.appendChild(option);
        });
      });

    this.dataService.getClientsObservable().subscribe(clients =>
      {
        setTimeout(() => this.deliveries.forEach(delivery => {
          delivery.clientName = clients.find(client => client.id == delivery.clientID).name;
          this.clients = clients;
          let clientNames = document.getElementById("clientnames");
          clientNames.innerHTML = "";
          this.clients.forEach(client => {
            let clientName = client.name;
            let option = document.createElement('option');
            option.value = clientName;
            clientNames.appendChild(option);});
          }), 100);
      }
    );  
      
  }

  ngAfterViewInit() {
    this.dataService.getDeliveries();
    this.dataService.getClients();
  }

  onEditItem(event) {
    let row = this.findRow(event);
    let inputs = row.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs.item(i).style.display = "block";
    }
    let button = row.getElementsByTagName("button");
    button.item(0).style.display = "block";
    this.getCars();
    this.getClients();
  }

  onDeleteItem(event) {
    let id = event.path[2].getElementsByClassName("id-column")[0].innerHTML;
    this.dataService.deleteDelivery(id);
  }

  onCommitButtonClick(event) {
    let id = this.findRowId(event);
    let row = this.findRow(event);
    let delivery = this.collectAllDataAboutDelivery(row);
    delivery.id = id;
    this.dataService.putDelivery(id, delivery);
    this.getClients();
    setTimeout(() => this.switchClientIdToClientName(), 300);
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
    return delivery;
  }

  findRowId(event) {
    return event.path[4].getElementsByClassName("id-column")[0].children[0].textContent;
  }

  findRow(event) {
    return event.path[4];
  }

  switchClientIdToClientName() {
    let paragraphClientNames = document.getElementsByClassName("paragraph-clientid");
    for (let i = 0; i < paragraphClientNames.length; i++) {
      let item = paragraphClientNames.item(i);
      let client = this.clients.find(client => client.id == parseInt(item.innerHTML))
      if (client) {
        item.innerHTML = client.name;
      }
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

}
