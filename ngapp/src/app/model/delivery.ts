import { Car } from './car';
import { DeliveryEmployee } from './delivery-employee';

export class Delivery {
    constructor() {}

    id: number;
    carVIN: string;
    car: Car;
    entryDate: Date;
    fuelSpent: number;
    fuelType: number;
    kmTravelled: number;
    clientID: number;
    clientName: string;
    deliveryEmployees: DeliveryEmployee[];

    fuelTypePolishString: string;
    deliveryEmployeesStr: string;
}