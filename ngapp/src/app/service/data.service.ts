import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Subject } from 'rxjs';
import { CarBrand } from '../model/car-brand';
import { Car } from '../model/car';
import { Delivery } from '../model/delivery';
import { Client } from '../model/client';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  carBrandsSubject: Subject<CarBrand[]>;
  carsSubject: Subject<Car[]>;
  deliveriesSubject: Subject<Delivery[]>;
  clientSubject: Subject<Client[]>;
  employeesSubject: Subject<Employee[]>;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.carBrandsSubject = new Subject();
    this.carsSubject = new Subject();
    this.deliveriesSubject = new Subject();
    this.clientSubject = new Subject();
    this.employeesSubject = new Subject();
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

  getEmployeesObservable() {
    return this.employeesSubject.asObservable();
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

  getEmployees() {
    this.http.get(environment.hostName + "Employees").subscribe(employees => {
      this.employeesSubject.next(employees as Employee[]);
    })
  }

  putCarBrand(id, carBrand) {
    let body = JSON.stringify(carBrand);
    this.http.put(environment.hostName + "CarBrands/" + id, body, this.httpOptions).subscribe(
      () => this.getCarBrands()
    );
  }

  deleteCarBrand(id: number) {
    this.http.delete(environment.hostName + "CarBrands/" + id).subscribe(
      () => this.getCarBrands()
    )
  }

  deleteCar(id: number) {
    this.http.delete(environment.hostName + "Cars/" + id).subscribe(this.getCars);
  }

  deleteDelivery(id: number) {
    this.http.delete(environment.hostName + "Deliveries/" + id).subscribe(
      () => this.getDeliveries()
    )
  }

  deleteClient(id: number) {
    this.http.delete(environment.hostName + "Clients/" + id).subscribe(
      () => this.getClients()
    )
  }

  deleteEmployee(id: number) {
    this.http.delete(environment.hostName + "Employees/" + id).subscribe(
      () => this.getEmployees()
    )
  }
}
