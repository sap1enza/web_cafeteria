import Pedido from "../domain/entity/pedido";
import Produto from "../domain/entity/produto";
import IGateways from "./IGateways";

export default interface IPedido extends IGateways {
    adicionarProdutoAoPedido(pedidoId: Pedido, produtoId: Produto);
}