import { CarBrand } from './car-brand';

export class Car {
    constructor() {}

    vin: string;
    brandID: number;
    model: string;
    registration: string;
    brand: CarBrand;
}