import CheckoutPagamentoRepository from "../../application/repositories/CheckoutPagamentoRepository";
import Checkout from "../entity/checkout";
import { StatusCheckout } from "../entity/enum/statusCheckout";
import IDataBase from "../../application/database/IDataBase";
import MPagamento from "../../application/core/paymentsMethods/MercadoPago/MPagamento";

class CheckoutPagamento {
    
    private repo: CheckoutPagamentoRepository;

    constructor(readonly checkout: Checkout, database: IDataBase) {
        this.repo = new CheckoutPagamentoRepository(database);
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
        this.paymentPIX(instance);

        return instance;
    }

    
    public paymentPIX = async (checkout : Checkout) => {
        let mercado_pago = new MPagamento(checkout);
        
    }


    public confirmPayment = async () : Promise<Checkout> => {
        this.checkout.setStatus(StatusCheckout.PAGAMENTO_EFETUADO);
        /**
         * TODO altera o status do pagamento no banco de dados
         */
        let instance = await this.repo.update(this.checkout, this.checkout.id);

        return instance; 
    }

}

export default CheckoutPagamento;