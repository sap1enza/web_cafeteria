import Checkout from "../entity/checkout";
import { StatusCheckout } from "../entity/enum/statusCheckout";
import IPaymentMethods from "../../application/core/paymentsMethods/IPaymentsMethods";
import IRepository from "../../application/repositories/IReporitory";

class CheckoutPagamento {
    
    constructor(
        readonly checkout: Checkout, 
        readonly repositoryCheckout: IRepository, 
        readonly metodo_pagamento: IPaymentMethods
    ) {

    }

    public create = async () : Promise<Checkout> => {
        this.checkout.setStatus(StatusCheckout.AGUARDANDO_PAGAMENTO);

        /**
         * TODO incluir o repository de envio para o Mercado Pago
         */
        let checkout = await this.repositoryCheckout.store(this.checkout);

        /**
         * TODO incluir o pagamento no banco de dados
         */
        try {
            let response = await this.metodo_pagamento.store(checkout);
            checkout.payload = JSON.stringify(response);
            /**
             * atualizo o checkout de pagamento com o retorno de sucesso ou erro do gateway
             */
            if (response['status_detail'] == 'pending_waiting_transfer') {
                this.checkout.setStatus(StatusCheckout.AGUARDANDO_CONFIMACAO_PAGAMENTO);
            }
            
            await this.repositoryCheckout.update(checkout, checkout.id);
        } catch (err) {
            throw new Error("Não foi possível realiza o pagamento na MP.");
        }
        
        return checkout;
    }


    public confirmPayment = async () : Promise<Checkout> => {
        this.checkout.setStatus(StatusCheckout.PAGAMENTO_EFETUADO);
        /**
         * TODO altera o status do pagamento no banco de dados
         */
        let checkout = await this.repositoryCheckout.update(this.checkout, this.checkout.id);

        return checkout; 
    }

}

export default CheckoutPagamento;