import CheckoutPagamentoRepository from "../../application/repositories/CheckoutPagamentoRepository";
import Checkout from "../entity/checkout";
import { StatusCheckout } from "../entity/enum/statusCheckout";
import IDataBase from "../../application/database/IDataBase";
import MPagamento from "../../application/core/paymentsMethods/MercadoPago/MPagamento";
import IPaymentMethods from "../../application/core/paymentsMethods/IPaymentsMethods";

class CheckoutPagamento {
    
    private repo: CheckoutPagamentoRepository;

    constructor(
        readonly checkout: Checkout, 
        readonly database: IDataBase, 
        readonly metodo_pagamento: IPaymentMethods
    ) {
        this.repo = new CheckoutPagamentoRepository(this.database);
    }

    public create = async () : Promise<Checkout> => {
        this.checkout.setStatus(StatusCheckout.AGUARDANDO_PAGAMENTO);

        /**
         * TODO incluir o repository de envio para o Mercado Pago
         */
        let checkout = await this.repo.store(this.checkout);

        /**
         * TODO incluir o pagamento no banco de dados
         */
        let response = await this.metodo_pagamento.store(checkout);


        checkout.payload = JSON.stringify(response);
        /**
         * atualizo o checkout de pagamento com o retorno de sucesso ou erro do gateway
         */
        await this.repo.update(checkout, checkout.id);

        return checkout;
    }


    public confirmPayment = async () : Promise<Checkout> => {
        this.checkout.setStatus(StatusCheckout.PAGAMENTO_EFETUADO);
        /**
         * TODO altera o status do pagamento no banco de dados
         */
        let checkout = await this.repo.update(this.checkout, this.checkout.id);

        return checkout; 
    }

}

export default CheckoutPagamento;