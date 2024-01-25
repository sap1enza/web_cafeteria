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
import IRepository from "../interfaces/IReporitory";

export class CheckoutPagamento {


    static async encontrarPagamentoPorIdPedido(idpedido, checkoutPagamentoRepository: IRepository){
        const checkout = await checkoutPagamentoRepository.findById(idpedido);
        return checkout;
    }
    public confirmPayment = async (checkout: Checkout, checkoutPagamentoRepository: IRepository) : Promise<Checkout> => {
        checkout.setStatus(StatusCheckout.PAGAMENTO_EFETUADO);
        /**
         * TODO altera o status do pagamento no banco de dados
         */
        return await checkoutPagamentoRepository.update(checkout, checkout.id);
    }

    static async CreateCheckout(request, checkoutPagamentoRepository: IRepository, paymentMethodsRepositorio: IPaymentMethods, repositorioPedido: IPedido){
        let pedido = await checkoutPagamentoRepository.findById(request.body.pedido_id);

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
        checkout = await checkoutPagamentoRepository.store(checkout);

        try {
            let response = await paymentMethodsRepositorio.store(checkout);

            checkout.payload = JSON.stringify(response);
            checkout.external_reference = response['id'];

            /**
             * atualizo o checkout de pagamento com o retorno de sucesso ou erro do gateway
             */
            if (paymentMethodsRepositorio.aguardandoPagamento()) {
                checkout.setStatus(StatusCheckout.AGUARDANDO_CONFIMACAO_PAGAMENTO);
            }

            await checkoutPagamentoRepository.update(checkout, checkout.id);
            pedido.setStatus(statusPedido.EM_PREPARACAO);
            await repositorioPedido.update(pedido, pedido.id);

        } catch (err) {
            console.log(err)
            throw new Error("Não foi possível realiza o pagamento na MP.");
        }
    }
        
    }
