import MysqlDataBase from "../../application/database/MysqlDataBase";
import CheckoutPagamentoRepository from "../../application/repositories/CheckoutPagamentoRepository";
import Checkout from "../entity/checkout";
import { StatusCheckout } from "../entity/enum/statusCheckout";

class CheckoutPagamento {
    
    private repo: CheckoutPagamentoRepository;

    constructor(readonly checkout: Checkout) {
        this.repo = new CheckoutPagamentoRepository(new MysqlDataBase());
    }

    public create = async () : Promise<Checkout> => {
        this.checkout.setStatus(StatusCheckout.AGUARDANDO_PAGAMENTO);

        /**
         * TODO incluir o repository de envio para o Mercado Pago
         */
        let instance = await this.repo.store(this.checkout);

        /**
         * TODO incluir o pagamento no banco de dados
         */
        this.paymentPIX();

        return instance;
    }

    
    paymentPIX = () => {}


    confirmPayment = async () : Promise<Checkout> => {
        this.checkout.setStatus(StatusCheckout.PAGAMENTO_EFETUADO);
        /**
         * TODO altera o status do pagamento no banco de dados
         */
        let instance = await this.repo.update(this.checkout, this.checkout.id);

        return instance; 
    }

}

export default CheckoutPagamento;