import { Component, OnInit } from '@angular/core';
import { Car } from '../../model/car';
import { DataService } from 'src/app/service/data.service';
import { CarBrand } from 'src/app/model/car-brand';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars: Car[] = [];
  carBrands: CarBrand[] = [];
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCarsObservable().subscribe((cars) => {
      this.cars = [];
      cars.forEach(car => this.cars.push(car));
    })  

    this.dataService.getCars();
    this.dataService.getCarBrands();

    this.dataService.getCarBrandsObservable().subscribe(carBrands => 
      {
        this.carBrands = carBrands;
        let carBrandNames = document.getElementById("carbrandnames");
        carBrandNames.innerHTML = "";
        this.carBrands.forEach(carBrand => {
          let carBrandName = carBrand.name;
          let option = document.createElement('option');
          option.value = carBrandName;   
          carBrandNames.appendChild(option);
        });
      });
  }

  onCreateItem(event) {
    let row = this.findRow(event);
    let car = this.collectAllDataAboutCarCreate(row);
    this.dataService.postCar(car);
    this.cleanCreateRow(row);
  }

  onEditItem(event) {
    let id = this.findRowId(event);
    let row = this.findRow(event);
    let inputs = row.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs.item(i).style.display = "block";
    }
    let button = row.getElementsByTagName("button");
    button.item(0).style.display = "block";
    this.getCarBrands();
  }

  onDeleteItem(event) {
    let id = this.findRowId(event);
    this.dataService.deleteCar(id);
  }

  onCommitButtonClick(event) {
    let id = this.findRowId(event);
    let row = this.findRow(event);
    let car = this.collectAllDataAboutCar(row);
    car.vin = id;
    this.dataService.putCar(id, car);
  }

  collectAllDataAboutCar(row): Car {
    let car = new Car();
    car.brandID = this.carBrands.find(carBrandName => carBrandName.name == row.getElementsByClassName("input-brandname")[0].value).id;
    car.model = this.getElementFromInputByFieldName("model", row);
    car.registration = this.getElementFromInputByFieldName("registration", row);
    return car;
  }

  collectAllDataAboutCarCreate(row): Car {
    let car = new Car();
    car.vin = this.getElementFromInputByFieldName("vin", row);
    car.brandID = this.carBrands.find(carBrandName => carBrandName.name == row.getElementsByClassName("input-brandname")[0].value).id;
    car.model = this.getElementFromInputByFieldName("model", row);
    car.registration = this.getElementFromInputByFieldName("registration", row);
    return car;
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

  getCarBrands() {
    this.dataService.getCarBrands();
  }

  cleanCreateRow(row) {
    let inputs = row.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs.item(i).value = "";  
    }
  }

}
