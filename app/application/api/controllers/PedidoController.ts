import * as HttpStatus from 'http-status';
import ClienteRepository from "../../repositories/ClienteRepository";
import PedidoRepository from "../../repositories/PedidoRepository";
import ResponseAPI from '../../core/ResponseAPI';
import MysqlDataBase from '../../database/MysqlDataBase';
import Pedido from '../../../domain/entity/pedido';
import Produto from '../../../domain/entity/produto';
import ProdutoRepository from '../../repositories/ProdutoRepository';

class PedidoController {
    /**
     *
     */
    public repository: PedidoRepository;
    public clienteRepository: ClienteRepository;
    public produtoRepository: ProdutoRepository;

    /**
     *
     */
    constructor() {
        //this.repository = new PedidoRepository(new MysqlDataBase());
        this.clienteRepository = new ClienteRepository(new MysqlDataBase());
        this.produtoRepository = new ProdutoRepository(new MysqlDataBase());
        this.repository = new PedidoRepository(new MysqlDataBase());
    }

    /**
     *
     * @param request
     * @param response
     */
    public all = async (request, response) => {
        try {
            let data = await this.repository.getAll(request.query);
            response.status(HttpStatus.OK).json(ResponseAPI.list(data));
        } catch(err) {
            response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message));
        }
    }

    /**
     *
     * @param request
     * @param response
     */
    public store = async (request, response) => {
        try {
            let customer = await this.clienteRepository.findById(request.body.client_id);
            let produtos: Produto[] = await this.produtoRepository.findByMultipleIds(request.body.produtosIds);
            let order = new Pedido(
                customer,
                request.body.status
            );
            try {

                produtos.forEach(produto => {
                    order.adicionarProduto(produto);
                       
                });

                const orderResult = await this.repository.store(order);
                
                const promises = order.getProdutos().map(async (produto) => {
                    const data = await this.repository.adicionarProdutoAoPedido(orderResult.id, produto.id);
                    return data;
                });

                await Promise.all(promises);

                response.status(HttpStatus.OK).json(ResponseAPI.data(order));

            } catch(err) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseAPI.error(err.message));
            }
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message));
        }
    }

    /**
     *
     * @param request
     * @param response
     */
    public update = async (request, response) => {
        try {
            let customer = await this.clienteRepository.findById(request.body.client_id);

            let order = new Pedido(
                customer,
                request.body.status
            );  
            let data = await this.repository.update(order, request.params.id);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
    }

    /**
     *
     * @param request
     * @param response
     */
    public show = async (request, response) => {
        try {
            if (typeof request.params.id == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requerido."));
            }
            let data = await this.repository.findById(request.params.id);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
    }

    /**
     *
     * @param request
     * @param response
     */
    public delete = async (request, response) => {
        try {
            if (typeof request.params.id == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requerido."));
            }
            let data = await this.repository.delete(request.params.id);
            response.status(HttpStatus.NO_CONTENT).json({});
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
    }

}

export default new PedidoController();
