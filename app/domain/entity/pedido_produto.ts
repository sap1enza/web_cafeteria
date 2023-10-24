import Pedido from "./pedido";
import Produto from "./produto";

class PedidoProduto {
    constructor (
        readonly pedido: Pedido,
        readonly produto: Produto,
        readonly id?
    ) {
      if (!pedido) {
        throw new Error("Pedido é obrigatório.");
      }

      if (!produto) {
        throw new Error("Produto é obrigatório.");
      }
    }
}

export default PedidoProduto;
