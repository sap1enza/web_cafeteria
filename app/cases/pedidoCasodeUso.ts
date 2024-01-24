import Pedido from '../domain/entity/pedido';
import Produto from '../domain/entity/produto';
import IClienteRepository from '../interfaces/ICliente';
import IPedido from '../interfaces/IPedido';
import IProduto from '../interfaces/IProduto';
import IRepository from '../interfaces/IGateways';

export class PedidoCasoDeUso{

    static async getAllPedidos(request, pedidoRepositorio: IPedido){
        const Pedidos = await pedidoRepositorio.getAll(request);
        return Pedidos;
    }

    static async criarPedido(request, pedidoRepositorio: IPedido){
        const Pedido = await pedidoRepositorio.store(request);
        return Pedido;
    }
    static async atualizarPedido(request, idPedido, pedidoRepositorio: IPedido){
        const Pedido = await pedidoRepositorio.update(request, idPedido);
        return Pedido;
    }
    static async encontrarPedidoPorId(idPedido, pedidoRepositorio: IPedido){
        const Pedido = await pedidoRepositorio.findById(idPedido);
        return Pedido;
    }

    static async adicionarProdutoPedido(request, clienteRepositorio: IClienteRepository,produtoRepositorio: IProduto, pedidoRepositorio: IPedido){
        try {
            let customer = await clienteRepositorio.findById(request.body.client_id);
            let produtos: Produto[] = await produtoRepositorio.findByMultipleIds(request.body.produtosIds);
            let order = new Pedido(
                customer,
                request.body.status
            );
            try {

                produtos.forEach(produto => {
                    order.adicionarProduto(produto);
                       
                });

                const orderResult = await pedidoRepositorio.store(order);
                
                const promises = order.getProdutos().map(async (produto) => {
                    const data = await pedidoRepositorio.adicionarProdutoAoPedido(orderResult.id, produto.id);
                    return data;
                });

                await Promise.all(promises);
            
        return orderResult.id;
            } 
            catch(err) {
                throw new Error(err.message)
                }
        } 
        catch (err) 
        {
            throw new Error(err.message)
        }
    }
    static async deletePedido(idPedido, PedidoRepositorio: IPedido){
                const Pedido = await PedidoRepositorio.delete(idPedido);
        return Pedido;
    }

}