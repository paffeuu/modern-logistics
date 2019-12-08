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

  onDeleteItem(event) {
    let id = event.path[2].getElementsByClassName("id-column")[0].innerHTML;
    this.dataService.deleteCarBrand(id);
  }


}
