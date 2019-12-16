import { Delivery } from './delivery'

export class Client {
    constructor() {}

    id: number;
    name: string;
    address: string;
    deliveries: Delivery[];
    deliveriesIds: string;
}