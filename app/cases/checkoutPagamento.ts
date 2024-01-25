import Cartao from "../entity/cartao";
import Checkout from '../entity/checkout';
import { StatusCheckout } from "../entity/enum/statusCheckout";
import { statusPedido } from "../entity/enum/statusPedido";
import Payer from "../entity/payer";
import Pix from "../entity/pix";
import CheckoutPagamentoRepository from "../gateways/CheckoutPagamentoRepository";
import IPaymentMethods from "../interfaces/IPaymentsMethods";
import MPagamento from "../gateways/paymentsMethods/MercadoPago/MPagamento";
import PaymentoMethods from '../entity/enum/PaymentoMethods';
import IPedido from "../interfaces/IPedido";
import IRepository from "../interfaces/IRepository";
import ICheckout from "../interfaces/ICheckout";

export class CheckoutPagamento {

    static instance = async(request, repositorioPedido: IPedido ) : Promise<Checkout> => {
        let pedido = await repositorioPedido.findById(request.body.pedido_id);
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
        checkout.setStatus(StatusCheckout.AGUARDANDO_PAGAMENTO);
        return checkout;
    }

    static async encontrarPagamentoPorIdPedido(
        idpedido, 
        checkoutPagamentoRepository: ICheckout,
        repositorioPedido: IRepository
    ) : Promise<Checkout> {
        let data = await checkoutPagamentoRepository.findByPedidoId(idpedido);
        let pedido = await repositorioPedido.findById(idpedido);
        let payer = new Payer(
            data['payer_name'],
            data['payer_email'],
            data['payer_document'],
        )
        let metodoPagamento = null;
        if (data['card_cvv'] != null) {
            metodoPagamento = new Cartao(
                payer,
                data['card_number'],
                data['card_cvv'],
                data['card_expiration_date'],
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
        return checkout;
    }

    static confirmPayment = async (
        checkout: Checkout, 
        checkoutPagamentoRepository: ICheckout
    ) : Promise<Checkout> => {
        checkout.setStatus(StatusCheckout.PAGAMENTO_EFETUADO);
        /**
         * TODO altera o status do pagamento no banco de dados
         */
        return await checkoutPagamentoRepository.update(checkout, checkout.id);
    }

    static async CreateCheckout(checkout: Checkout, checkoutPagamentoRepository: IRepository, paymentMethodsRepositorio: IPaymentMethods, repositorioPedido: IPedido)
    {
        try {
            let response = await paymentMethodsRepositorio.store(checkout);
            checkout.payload = JSON.stringify(response);

            /**
             * atualizo o checkout de pagamento com o retorno de sucesso ou erro do gateway
             */
            if (paymentMethodsRepositorio.aguardandoPagamento()) {
                checkout.setStatus(StatusCheckout.AGUARDANDO_CONFIMACAO_PAGAMENTO);
            }

            await checkoutPagamentoRepository.update(checkout, checkout.id);
            checkout.pedido.setStatus(statusPedido.EM_PREPARACAO);
            await repositorioPedido.update(checkout.pedido, checkout.pedido.id);
            
        } catch (err) {
            console.log(err)
            throw new Error("Não foi possível realiza o pagamento na MP.");
        }
    }
        
    }
