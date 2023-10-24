import Pedido from "./pedido";
import Produto from "./produto";

class PedidoProduto {
    constructor (
        readonly pedido: Pedido,
        readonly produto: Produto,
        readonly id?
    ) {}
}

export default PedidoProduto;
