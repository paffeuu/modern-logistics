import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Subject } from 'rxjs';
import { CarBrand } from '../model/car-brand';
import { Car } from '../model/car';
import { Delivery } from '../model/delivery';
import { Client } from '../model/client';
import { environment, endpoints, authEndpoints } from 'src/environments/environment';
import { Employee } from '../model/employee';
import { NotificationService } from './notification.service';
import { UserModel } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  carBrandsSubject: Subject<CarBrand[]>;
  carsSubject: Subject<Car[]>;
  deliveriesSubject: Subject<Delivery[]>;
  clientsSubject: Subject<Client[]>;
  employeesSubject: Subject<Employee[]>;
  usersSubject: Subject<UserModel[]>; 

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService) {
    this.carBrandsSubject = new Subject();
    this.carsSubject = new Subject();
    this.deliveriesSubject = new Subject();
    this.clientsSubject = new Subject();
    this.employeesSubject = new Subject();
    this.usersSubject = new Subject();
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
    return this.clientsSubject.asObservable();
  }

  getEmployeesObservable() {
    return this.employeesSubject.asObservable();
  }

  getUsersObservable() {
    return this.usersSubject.asObservable();
  }

  postCarBrand(carBrand) {
    let body = JSON.stringify(carBrand);
    this.http.post(environment.hostName + environment.apiPath + endpoints.carBrands, body, this.httpOptions).subscribe(
      () => this.getCarBrands(),
      err => this.notificationService.parseErrorMessage(err)
    );
  }

  postCar(car) {
    let body = JSON.stringify(car);
    this.http.post(environment.hostName + environment.apiPath + endpoints.cars, body, this.httpOptions).subscribe(
      () => this.getCars(),
      err => this.notificationService.parseErrorMessage(err)
    );
  }

  postDelivery(delivery) {
    let body = JSON.stringify(delivery);
    this.http.post(environment.hostName + environment.apiPath + endpoints.deliveries, body, this.httpOptions).subscribe(
      () => this.getDeliveries(),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  postClient(client) {
    let body = JSON.stringify(client);
    this.http.post(environment.hostName + environment.apiPath + endpoints.clients, body, this.httpOptions).subscribe(
      () => this.getClients(),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  postEmployee(employee) {
    let body = JSON.stringify(employee);
    this.http.post(environment.hostName + environment.apiPath + endpoints.employees, body, this.httpOptions).subscribe(
      () => this.getEmployees(),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  getCarBrands() {
    this.http.get(environment.hostName + environment.apiPath + endpoints.carBrands).subscribe(
      carBrands => this.carBrandsSubject.next(carBrands as CarBrand[]),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  getCars() {
    this.http.get(environment.hostName + environment.apiPath + endpoints.cars).subscribe(
      cars => this.carsSubject.next(cars as Car[]),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  getDeliveries() {
    this.http.get(environment.hostName + environment.apiPath + endpoints.deliveries).subscribe(
      deliveries => this.deliveriesSubject.next(deliveries as Delivery[]),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  getClients() {
    this.http.get(environment.hostName + environment.apiPath + endpoints.clients).subscribe(
      clients => this.clientsSubject.next(clients as Client[]),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  getEmployees() {
    this.http.get(environment.hostName + environment.apiPath + endpoints.employees).subscribe(
      employees => this.employeesSubject.next(employees as Employee[]),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  getUsers() {
    this.http.get(environment.hostName + environment.authPath + authEndpoints.users).subscribe(
      users => this.usersSubject.next(users as UserModel[]),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  putCarBrand(id, carBrand) {
    let body = JSON.stringify(carBrand);
    this.http.put(environment.hostName + environment.apiPath + endpoints.carBrands + "/" + id, body, this.httpOptions).subscribe(
      () => this.getCarBrands(),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  putCar(id, car) {
    let body = JSON.stringify(car);
    this.http.put(environment.hostName + environment.apiPath + endpoints.cars + "/" + id, body, this.httpOptions).subscribe(
      () => this.getCars(),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  putDelivery(id, delivery) {
    let body = JSON.stringify(delivery);
    this.http.put(environment.hostName + environment.apiPath + endpoints.deliveries + "/" + id, body, this.httpOptions).subscribe(
      () => this.getDeliveries(),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  putClient(id, client) {
    let body = JSON.stringify(client);
    this.http.put(environment.hostName + environment.apiPath + endpoints.clients + "/" + id, body, this.httpOptions).subscribe(
      () => this.getClients(),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  putEmployee(id, employee) {
    let body = JSON.stringify(employee);
    this.http.put(environment.hostName + environment.apiPath + endpoints.employees + "/" + id, body, this.httpOptions).subscribe(
      () => this.getEmployees(),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  deleteCarBrand(id: number) {
    this.http.delete(environment.hostName + environment.apiPath + endpoints.carBrands + "/" + id).subscribe(
      () => this.getCarBrands(),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  deleteCar(id: number) {
    this.http.delete(environment.hostName + environment.apiPath + endpoints.cars + "/" + id).subscribe(
      () => this.getCars()),
      err => this.notificationService.parseErrorMessage(err)
  }

  deleteDelivery(id: number) {
    this.http.delete(environment.hostName + environment.apiPath + endpoints.deliveries + "/" + id).subscribe(
      () => this.getDeliveries(),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  deleteClient(id: number) {
    this.http.delete(environment.hostName + environment.apiPath + endpoints.clients + "/" + id).subscribe(
      () => this.getClients(),
      err => this.notificationService.parseErrorMessage(err)
    )
  }

  deleteEmployee(id: number) {
    this.http.delete(environment.hostName + environment.apiPath + endpoints.employees + "/" + id).subscribe(
      () => this.getEmployees(),
      err => this.notificationService.parseErrorMessage(err)
    )
  }
}
