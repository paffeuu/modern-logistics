import { Car } from './car';
import { DeliveryEmployee } from './delivery-employee';

export class Delivery {
    constructor() {}

    id: number;
    car: Car;
    entryDate: Date;
    fuelSpent: number;
    fuelType: number;
    kmTravelled: number;
    clientID: number;
    deliveryEmployees: DeliveryEmployee[];

    fuelTypePolishString: string;
    deliveryEmployeesStr: string;
}