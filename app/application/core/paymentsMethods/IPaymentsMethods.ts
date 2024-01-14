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
     * metodo de criação de pagamento PIX
     * @param checkout 
     */
    abstract storePix(checkout: Checkout);

    /**
     * metodo de criação de pagamento Cartão
     * @param checkout 
     */
    abstract storeCard(checkout: Checkout);
    
    /**
     * metodo de busca do pagamento
     * @param id 
     */
    abstract find(id: BigInt);
}

export default IPaymentMethods;