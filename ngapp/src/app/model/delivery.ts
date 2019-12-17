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
    deliveryEmployees: DeliveryEmployee[];

    clientName: string;
    fuelTypePolishString: string;
    deliveryEmployeesStr: string;
    employeeSurnames: string;

    setFuelType(fuelType) {
        let fuelTypes = ["benzyna", "diesel", "gaz", "etanol", "biodiesel", "elektryczny", "hydrogen"];
        for (let i = 0; i < fuelTypes.length; i++) {
            if (fuelTypes[i] == fuelType) {
                return i;
            }
        }
    }
}