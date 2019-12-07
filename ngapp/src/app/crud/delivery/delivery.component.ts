import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/model/delivery';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  deliveries: Delivery[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getDeliveriesObservable().subscribe((deliveries) => {
      deliveries.forEach(delivery => this.deliveries.push(delivery));
      console.log(this.deliveries)
    })

    this.dataService.getDeliveries();
  }

}
