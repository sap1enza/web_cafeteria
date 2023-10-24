import Cliente from "./cliente";

class Pedido {
    constructor (
        readonly cliente: Cliente,
        readonly status,
        readonly id?
    ) {}
}

export default Pedido;
