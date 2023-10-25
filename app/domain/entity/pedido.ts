import Cliente from "./cliente";
import { statusPedido } from './enum/statusPedido';

class Pedido {
    constructor (
        readonly cliente: Cliente,
        readonly status: statusPedido,
        readonly id?
    ) {
      if (!cliente) {
        throw new Error("Cliente é obrigatório.");
      }
    }
}

export default Pedido;
