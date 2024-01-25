import * as HttpStatus from 'http-status';
import ResponseAPI from "../adapters/ResponseAPI"
import {Request, Response} from 'express';
import Checkout from '../entity/checkout';
import Cartao from '../entity/cartao';
import Payer from '../entity/payer';
import PedidoRepository from '../gateways/PedidoRepository';
import MysqlDataBase from '../external/MysqlDataBase';
import { statusPedido } from '../entity/enum/statusPedido';
import IPaymentMethods from '../interfaces/IPaymentsMethods';
import MPagamento from '../gateways/paymentsMethods/MercadoPago/MPagamento';
import CheckoutPagamentoRepository from '../gateways/CheckoutPagamentoRepository';
import PaymentoMethods from '../entity/enum/PaymentoMethods';
import Pix from '../entity/pix';
import { IDataBase } from '../interfaces/IDataBase';
import { CheckoutPagamento } from '../cases/checkoutPagamento';


class CheckoutController {

    private _dbconnection: IDataBase;
    private repository : CheckoutPagamentoRepository;
    private pedidoRepository: PedidoRepository;
    private metodoPagamento: IPaymentMethods;

    constructor(dbconnection: IDataBase) {

        this._dbconnection = dbconnection;
        this.pedidoRepository = new PedidoRepository(this._dbconnection);
        this.metodoPagamento = new MPagamento();
        this.repository = new CheckoutPagamentoRepository(this._dbconnection);
    }
    /**
     * 
     * @param request 
     * @param response 
     */
    public store = async (request: Request, response: Response) => {
            try {
                let data = await CheckoutPagamento.CreateCheckout(request, this.repository,this.metodoPagamento,this.pedidoRepository);
                response.status(HttpStatus.OK).json(ResponseAPI.data(data));
            } catch(err) {
                    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseAPI.error(err.message)); 
            } 
    }


    public hook = async (request: Request, response: Response) => {
        response.status(HttpStatus.OK).json(ResponseAPI.data(request.params.uuid));
    }


    public findByIdPedido = async (request, response) => {
        try {

            if (typeof request.params.pedido_id == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requerido."));
            }

            let data = await CheckoutPagamento.encontrarPagamentoPorIdPedido(request.params.pedido_id, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
    }

}

export default CheckoutController;