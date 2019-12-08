import { DeliveryEmployee } from './delivery-employee';

export class Employee {
    constructor() {}

    id: number;
    pesel: string;
    forename: string;
    surname: string;
    deliveryEmployees: DeliveryEmployee[];

    deliveryEmployeesStr: string;
}