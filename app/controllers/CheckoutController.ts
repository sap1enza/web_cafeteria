import * as HttpStatus from 'http-status';
import ResponseAPI from "../adapters/ResponseAPI"
import {Request, Response} from 'express';
import PedidoRepository from '../gateways/PedidoRepository';
import IPaymentMethods from '../interfaces/IPaymentsMethods';
import MPagamento from '../gateways/paymentsMethods/MercadoPago/MPagamento';
import CheckoutPagamentoRepository from '../gateways/CheckoutPagamentoRepository';
import { IDataBase } from '../interfaces/IDataBase';
import { CheckoutPagamento } from '../cases/checkoutPagamento';


class CheckoutController {

    private repository : CheckoutPagamentoRepository;
    private pedidoRepository: PedidoRepository;
    private metodoPagamento: IPaymentMethods;

    constructor(readonly dbconnection: IDataBase) {
        this.pedidoRepository = new PedidoRepository(dbconnection);
        this.metodoPagamento = new MPagamento();
        this.repository = new CheckoutPagamentoRepository(dbconnection);
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public store = async (request: Request, response: Response) => {
        try {
            let checkout = await CheckoutPagamento.instance(request, this.pedidoRepository)
            let data = await CheckoutPagamento.CreateCheckout(
                checkout, 
                this.repository,
                this.metodoPagamento,
                this.pedidoRepository
            );
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
        } catch(err) {
            if (err instanceof Error) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseAPI.error(err.message)); 
            }
        } 
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public hook = async (request: Request, response: Response) => {
        
        if (typeof request.params.pedido_id == 'undefined') {
            response.status(HttpStatus.BAD_REQUEST).json(
                ResponseAPI.inputError("id", "ID do registro é requerido.")
            );
        }

        let checkout = await CheckoutPagamento.encontrarPagamentoPorIdPedido(
            request.params.pedido_id,
            this.repository,
            this.pedidoRepository
        );

        await CheckoutPagamento.confirmPayment(checkout ,this.repository);
        response.status(HttpStatus.OK).json(ResponseAPI.data(checkout));
    }


    public findByIdPedido = async (request, response) => {
        try {

            if (typeof request.params.pedido_id == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(
                    ResponseAPI.inputError("id", "ID do registro é requerido.")
                );
            }

            let checkout = await CheckoutPagamento.encontrarPagamentoPorIdPedido(
                request.params.pedido_id, 
                this.repository,
                this.pedidoRepository
            );
            response.status(HttpStatus.OK).json(ResponseAPI.data(checkout));
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
    }

}

export default CheckoutController;