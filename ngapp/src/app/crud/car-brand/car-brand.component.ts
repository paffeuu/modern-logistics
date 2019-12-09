import { Component, OnInit } from '@angular/core';
import { CarBrand } from '../../model/car-brand';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-car-brand',
  templateUrl: './car-brand.component.html',
  styleUrls: ['./car-brand.component.css']
})
export class CarBrandComponent implements OnInit {

  carBrands: CarBrand[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCarBrandsObservable().subscribe((carBrands) => {
      this.carBrands = [];
      carBrands.forEach(carBrand => this.carBrands.push(carBrand));
    })

    this.dataService.getCarBrands();
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
  }

  onDeleteItem(event) {
    let id = this.findRowId(event);
    this.dataService.deleteCarBrand(id);
  }

  onCommitButtonClick(event) {
    let id = this.findRowId(event);
    let row = this.findRow(event);
    let carBrand = this.collectAllDataAboutCarBrand(row);
    carBrand.id = id;
    this.dataService.putCarBrand(id, carBrand);
  }

  collectAllDataAboutCarBrand(row): CarBrand {
    let carBrand = new CarBrand();
    carBrand.name = this.getElementFromInputByFieldName("name", row);
    return carBrand;
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

}
