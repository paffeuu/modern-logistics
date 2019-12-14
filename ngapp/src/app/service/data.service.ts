import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Subject } from 'rxjs';
import { CarBrand } from '../model/car-brand';
import { Car } from '../model/car';
import { Delivery } from '../model/delivery';
import { Client } from '../model/client';
import { environment, endpoints } from 'src/environments/environment';
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

  postCarBrand(carBrand) {
    let body = JSON.stringify(carBrand);
    this.http.post(environment.hostName + environment.apiPath + endpoints.carBrands, body, this.httpOptions).subscribe(
      () => this.getCarBrands()
    );
  }

  postCar(car) {
    let body = JSON.stringify(car);
    this.http.post(environment.hostName + environment.apiPath + endpoints.cars, body, this.httpOptions).subscribe(
      () => this.getCars()
    );
  }

  postDelivery(delivery) {
    let body = JSON.stringify(delivery);
    this.http.post(environment.hostName + environment.apiPath + endpoints.deliveries, body, this.httpOptions).subscribe(
      () => this.getDeliveries()
    )
  }

  postClient(client) {
    let body = JSON.stringify(client);
    this.http.post(environment.hostName + environment.apiPath + endpoints.clients, body, this.httpOptions).subscribe(
      () => this.getClients()
    )
  }

  postEmployee(employee) {
    let body = JSON.stringify(employee);
    this.http.post(environment.hostName + environment.apiPath + endpoints.employees, body, this.httpOptions).subscribe(
      () => this.getEmployees()
    )
  }

  getCarBrands() {
    this.http.get(environment.hostName + environment.apiPath + endpoints.carBrands).subscribe((carBrands) =>
    {
      this.carBrandsSubject.next(carBrands as CarBrand[]);
    })
  }

  getCars() {
    this.http.get(environment.hostName + environment.apiPath + endpoints.cars).subscribe((cars) =>
    {
      this.carsSubject.next(cars as Car[]);
    })
  }

  getDeliveries() {
    this.http.get(environment.hostName + environment.apiPath + endpoints.deliveries).subscribe((deliveries) => {
      this.deliveriesSubject.next(deliveries as Delivery[]);
    })
  }

  getClients() {
    this.http.get(environment.hostName + environment.apiPath + endpoints.clients).subscribe(clients => {
      this.clientSubject.next(clients as Client[]);
    })
  }

  getEmployees() {
    this.http.get(environment.hostName + environment.apiPath + endpoints.employees).subscribe(employees => {
      this.employeesSubject.next(employees as Employee[]);
    })
  }

  putCarBrand(id, carBrand) {
    let body = JSON.stringify(carBrand);
    this.http.put(environment.hostName + environment.apiPath + endpoints.carBrands + "/" + id, body, this.httpOptions).subscribe(
      () => this.getCarBrands()
    );
  }

  putCar(id, car) {
    let body = JSON.stringify(car);
    this.http.put(environment.hostName + environment.apiPath + endpoints.cars + "/" + id, body, this.httpOptions).subscribe(
      () => this.getCars()
    );
  }

  putDelivery(id, delivery) {
    let body = JSON.stringify(delivery);
    this.http.put(environment.hostName + environment.apiPath + endpoints.deliveries + "/" + id, body, this.httpOptions).subscribe(
      () => this.getDeliveries()
    )
  }

  putClient(id, client) {
    let body = JSON.stringify(client);
    this.http.put(environment.hostName + environment.apiPath + endpoints.clients + "/" + id, body, this.httpOptions).subscribe(
      () => this.getClients()
    )
  }

  putEmployee(id, employee) {
    let body = JSON.stringify(employee);
    this.http.put(environment.hostName + environment.apiPath + endpoints.employees + "/" + id, body, this.httpOptions).subscribe(
      () => this.getEmployees()
    )
  }

  deleteCarBrand(id: number) {
    this.http.delete(environment.hostName + environment.apiPath + endpoints.carBrands + "/" + id).subscribe(
      () => this.getCarBrands()
    )
  }

  deleteCar(id: number) {
    this.http.delete(environment.hostName + environment.apiPath + endpoints.cars + "/" + id).subscribe(this.getCars);
  }

  deleteDelivery(id: number) {
    this.http.delete(environment.hostName + environment.apiPath + endpoints.deliveries + "/" + id).subscribe(
      () => this.getDeliveries()
    )
  }

  deleteClient(id: number) {
    this.http.delete(environment.hostName + environment.apiPath + endpoints.clients + "/" + id).subscribe(
      () => this.getClients()
    )
  }

  deleteEmployee(id: number) {
    this.http.delete(environment.hostName + environment.apiPath + endpoints.employees + "/" + id).subscribe(
      () => this.getEmployees()
    )
  }
}
