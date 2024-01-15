import Checkout from "../../../domain/entity/checkout";

abstract class IPaymentMethods {
    /**
     * endpoint empresa
     */
    public url : string = null;
    /**
     * token de autorização
     */
    public auth_token : string = null;

    /**
     * metodo de criação de pagamento
     * @param checkout 
     */
    abstract store(checkout: Checkout);
    
    /**
     * metodo de busca do pagamento
     * @param id 
     */
    abstract find(id: BigInt);
}

export default IPaymentMethods;