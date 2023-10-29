import Checkout from "../entity/checkout";
import { StatusCheckout } from "../entity/enum/statusCheckout";

class CheckoutPagamento{
    
    constructor(readonly checkout: Checkout) {}

    create = () => {
        this.checkout.setStatus(StatusCheckout.AGUARDANDO_PAGAMENTO);
        /**
         * TODO incluir o pagamento no banco de dados
         */
        this.paymentPIX();
        /**
         * TODO incluir o repository de envio para o Mercado Pago
         */
    }

    
    paymentPIX = () => {}


    paymentCreditCard = () => {}


    confirmPayment = () => {
        this.checkout.setStatus(StatusCheckout.PAGAMENTO_EFETUADO);
        /**
         * TODO altera o status do pagamento no banco de dados
         */

    }

}