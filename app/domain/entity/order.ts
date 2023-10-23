import Customer from "./customer";

class Order {
    constructor (
        readonly customer: Customer,
        readonly status,
        readonly id?
    ) {}
}

export default Order;
