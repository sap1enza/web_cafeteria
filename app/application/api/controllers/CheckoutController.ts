import * as HttpStatus from 'http-status';
import ResponseAPI from "../../core/ResponseAPI"
import {Request, Response} from 'express';
import Checkout from '../../../domain/entity/checkout';
import Cartao from '../../../domain/entity/cartao';
import Payer from '../../../domain/entity/payer';
import CheckoutPagamento from '../../../domain/cases/checkoutPagamento';
import PedidoRepository from '../../repositories/PedidoRepository';
import MysqlDataBase from '../../database/MysqlDataBase';
import { statusPedido } from '../../../domain/entity/enum/statusPedido';
import IPaymentMethods from '../../core/paymentsMethods/IPaymentsMethods';
import MPagamento from '../../core/paymentsMethods/MercadoPago/MPagamento';
import CheckoutPagamentoRepository from '../../repositories/CheckoutPagamentoRepository';
import PaymentoMethods from '../../core/paymentsMethods/PaymentoMethods';
import Pix from '../../../domain/entity/pix';


class CheckoutController {

    private repository : CheckoutPagamentoRepository;
    private pedidoRepository: PedidoRepository;
    private mysqlidatabase: MysqlDataBase;
    private metodoPagamento: IPaymentMethods;
    constructor() {
        this.mysqlidatabase = new MysqlDataBase();
        this.pedidoRepository = new PedidoRepository(this.mysqlidatabase);
        this.metodoPagamento = new MPagamento();
        this.repository = new CheckoutPagamentoRepository(this.mysqlidatabase);
    }
    /**
     * 
     * @param request 
     * @param response 
     */
    public store = async (request: Request, response: Response) => {
        try {
            
            let pedido = await this.pedidoRepository.findById(request.body.pedido_id);
            let payer = new Payer(
                request.body.cartao.payer.name,
                request.body.cartao.payer.email,
                request.body.cartao.payer.document,
            )
            let metodoPagamento = null;
            if (request.body.cartao.payment_method_id == PaymentoMethods.CARD_CREDIT) {
                metodoPagamento = new Cartao(
                    payer,
                    request.body.cartao.number,
                    request.body.cartao.cvv,
                    request.body.cartao.expiration_date,
                )
            } else {
                metodoPagamento = new Pix(
                    payer
                )
            }

            let checkout = new Checkout(
                pedido,
                metodoPagamento
            );
            
            checkout.setPaymentMethod(request.body.payment_method_id)

            let checkoutPagamento = new CheckoutPagamento(
                checkout,  
                new CheckoutPagamentoRepository(this.mysqlidatabase),
                this.metodoPagamento
            );
            
            try {
                let data = await checkoutPagamento.create();
                pedido.setStatus(statusPedido.EM_PREPARACAO);
                await this.pedidoRepository.update(pedido, pedido.id);
                response.status(HttpStatus.OK).json(ResponseAPI.data(data));
            } catch(err) {
                    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseAPI.error(err.message)); 
            }

        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message)); 
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

            let data = await this.repository.findByIdPedido(request.params.pedido_id);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
    }

}

export default new CheckoutController();