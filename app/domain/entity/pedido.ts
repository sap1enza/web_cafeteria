import Cliente from "./cliente";

class Pedido {
    constructor (
        readonly cliente: Cliente,
        readonly status,
        readonly id?
    ) {
      if (!cliente) {
        throw new Error("Cliente é obrigatório.");
      }
    }
}

export default Pedido;
