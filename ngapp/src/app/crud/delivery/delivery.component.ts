import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/model/delivery';
import { DataService } from 'src/app/service/data.service';
import { FuelType } from 'src/app/model/fuel-type';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  deliveries: Delivery[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDeliveriesObservable().subscribe(deliveries => {
      deliveries.forEach(delivery => {
        delivery.fuelTypePolishString = FuelType[delivery.fuelType];
        delivery.deliveryEmployeesStr = delivery.deliveryEmployees.map(
          deliveryEmployee => deliveryEmployee.employeeId).join(", ");
        this.deliveries.push(delivery);
      })
    });

    this.dataService.getDeliveries();
  }

}
