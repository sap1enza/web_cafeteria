import Pedido from "../domain/entity/pedido";
import Produto from "../domain/entity/produto";
import IRepository from "./IReporitory";

export default interface IPedido extends IRepository {
    adicionarProdutoAoPedido(pedidoId: Pedido, produtoId: Produto);
}