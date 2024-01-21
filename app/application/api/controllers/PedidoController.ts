import * as HttpStatus from 'http-status';
import ClienteRepository from "../../../gateways/ClienteRepository";
import PedidoRepository from '../../../gateways/PedidoRepository';
import ResponseAPI from '../../../adapters/ResponseAPI';
//import MysqlDataBase from '../../../external/MysqlDataBase';
import { IDataBase } from "../../../interfaces/IDataBase";
import { PedidoCasoDeUso } from '../../../cases/pedidoCasodeUso';
import Pedido from '../../../domain/entity/pedido';
import Produto from '../../../domain/entity/produto';
import ProdutoRepository from '../../../gateways/ProdutoRepository';

class PedidoController {
    /**
     *
     * 

    /**
     * 
     */
    private _dbconnection: IDataBase;
    public repository: PedidoRepository;
    public clienteRepository: ClienteRepository;
    public produtoRepository: ProdutoRepository;

    /**
     *
     */
    constructor(dbconnection: IDataBase) {
        this._dbconnection = dbconnection;
        //this.repository = new PedidoRepository(new MysqlDataBase());
        this.clienteRepository = new ClienteRepository(dbconnection);
        this.produtoRepository = new ProdutoRepository(dbconnection);
        this.repository = new PedidoRepository(dbconnection);
    }

    /**
     *
     * @param request
     * @param response
     */
    public all = async (request, response) => {
        try {
            let data = await PedidoCasoDeUso.getAllPedidos(request.query,this.repository);
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
                const orderResultId =PedidoCasoDeUso.adicionarProdutoPedido(request,this.clienteRepository,this.produtoRepository,this.repository)
                response.status(HttpStatus.OK).json(ResponseAPI.data(orderResultId));

            } catch(err) {
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
            console.log(request.params.id)
            console.log(request.body.status)
            let order: Pedido = await PedidoCasoDeUso.encontrarPedidoPorId(request.params.id, this.repository);

            order.setStatus(request.body.status);
            
            let data = await PedidoCasoDeUso.atualizarPedido(order, request.params.id,this.repository);
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
            let data = await PedidoCasoDeUso.encontrarPedidoPorId(request.params.id,this.repository);
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
            let data = await PedidoCasoDeUso.deletePedido(request.params.id,this.repository);
            response.status(HttpStatus.NO_CONTENT).json({});
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
    }

}

export default PedidoController;
