import { Car } from './car';

export class Delivery {
    constructor() {}

    id: number;
    car: Car;
    entryDate: Date;
    fuelSpent: number;
    // TODO: what's that 
    fuelType: string;
    kmTravelled: number;
    // TODO: class Client
    client: any;
    // TODO: class deliveryEmployees
    deliveryEmployees: any;
}