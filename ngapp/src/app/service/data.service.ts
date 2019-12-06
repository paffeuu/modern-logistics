import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Subject } from 'rxjs';
import { CarBrand } from '../model/car-brand';
import { Car } from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  carBrandsSubject: Subject<CarBrand[]>;
  carsSubject: Subject<Car[]>;

  constructor(private http: HttpClient) {
    this.carBrandsSubject = new Subject();
    this.carsSubject = new Subject();
  }

  getCarBrandsObservable() {
    return this.carBrandsSubject.asObservable();
  }

  getCarsObservable() {
    return this.carsSubject.asObservable();
  }

  getCarBrands() {
    this.http.get("http://www.mocky.io/v2/5dea7fe430000084c02b0981").subscribe((carBrands) =>
    {
      this.carBrandsSubject.next(carBrands as CarBrand[]);
    })
  }

  getCars() {
    this.http.get("http://www.mocky.io/v2/5dea87d33000006f6b2b09bd").subscribe((cars) =>
    {
      this.carsSubject.next(cars as Car[]);
    })
  }
}
