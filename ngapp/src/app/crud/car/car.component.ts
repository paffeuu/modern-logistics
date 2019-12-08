import { Component, OnInit } from '@angular/core';
import { Car } from '../../model/car';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCarsObservable().subscribe((cars) => {
      this.cars = [];
      cars.forEach(car => this.cars.push(car));
    })

    this.dataService.getCars();
  }

  onDeleteItem(event) {
    let id = event.path[2].getElementsByClassName("id-column")[0].innerHTML;
    this.dataService.deleteCar(id);
  }

}
