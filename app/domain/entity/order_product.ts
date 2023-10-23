import Order from "./order";
import Product from "./product";

class OrderProduct {
    constructor (
        readonly order: Order,
        readonly product: Product,
        readonly id?
    ) {}
}

export default OrderProduct;
