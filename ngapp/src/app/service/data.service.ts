import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Subject } from 'rxjs';
import { CarBrand } from '../model/car-brand';
import { Car } from '../model/car';
import { Delivery } from '../model/delivery';
import { Client } from '../model/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  carBrandsSubject: Subject<CarBrand[]>;
  carsSubject: Subject<Car[]>;
  deliveriesSubject: Subject<Delivery[]>;
  clientSubject: Subject<Client[]>;

  constructor(private http: HttpClient) {
    this.carBrandsSubject = new Subject();
    this.carsSubject = new Subject();
    this.deliveriesSubject = new Subject();
    this.clientSubject = new Subject();
  }

  getCarBrandsObservable() {
    return this.carBrandsSubject.asObservable();
  }

  getCarsObservable() {
    return this.carsSubject.asObservable();
  }

  getDeliveriesObservable() {
    return this.deliveriesSubject.asObservable();
  }

  getClientsObservable() {
    return this.clientSubject.asObservable();
  }

  getCarBrands() {
    this.http.get(environment.hostName + "CarBrands").subscribe((carBrands) =>
    {
      this.carBrandsSubject.next(carBrands as CarBrand[]);
    })
  }

  getCars() {
    this.http.get(environment.hostName + "Cars").subscribe((cars) =>
    {
      this.carsSubject.next(cars as Car[]);
    })
  }

  getDeliveries() {
    this.http.get(environment.hostName + "Deliveries").subscribe((deliveries) => {
      this.deliveriesSubject.next(deliveries as Delivery[]);
    })
  }

  getClients() {
    this.http.get(environment.hostName + "Clients").subscribe(clients => {
      this.clientSubject.next(clients as Client[]);
    })
  }
}
