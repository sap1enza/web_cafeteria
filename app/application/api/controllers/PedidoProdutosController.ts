import * as HttpStatus from 'http-status';
import PedidoProdutosRepository from "../../repositories/PedidoProdutosRepository";
import PedidoRepository from "../../repositories/PedidoRepository";
import ProdutoRepository from "../../repositories/ProdutoRepository";
import ResponseAPI from '../../core/ResponseAPI';
import MysqlDataBase from '../../database/MysqlDataBase';
import PedidoProduto from '../../../domain/entity/pedido_produto';

class PedidoProdutosController {
    /**
     *
     */
    public repository: PedidoProdutosRepository;
    public pedidoRepository: PedidoRepository;
    public produtoRepository: ProdutoRepository;

    /**
     *
     */
    constructor() {
        this.repository = new PedidoProdutosRepository(new MysqlDataBase());
        this.pedidoRepository = new PedidoRepository(new MysqlDataBase());
        this.produtoRepository = new ProdutoRepository(new MysqlDataBase());
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
            let order = await this.pedidoRepository.findById(request.body.pedido_id);
            let product = await this.produtoRepository.findById(request.body.produto_id);

            let order_product = new PedidoProduto(
                order,
                product
            );

            try {
                let data = await this.repository.store(order_product);
                response.status(HttpStatus.OK).json(ResponseAPI.data(data));
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
            let order = await this.pedidoRepository.findById(request.body.order_id);
            let product = await this.produtoRepository.findById(request.body.product_id);

            let order_product = new PedidoProduto(
              order,
              product
            );

            let data = await this.repository.update(order_product, request.params.id);
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
            console.log(request.params.pedido_id);
            if (typeof request.params.pedido_id == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requerido."));
            }
            console.log(request.params.pedido_id);
            let data = await this.repository.findByIdpedido(request.params.pedido_id);
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

export default new PedidoProdutosController();
