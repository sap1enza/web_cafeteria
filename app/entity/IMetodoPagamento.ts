import Payer from "./payer";

abstract class IMetodoPagamento {
    public payer : Payer;
    number: string = null;
    cvv: string = null;
    expirationDate: string = null;
}

export default IMetodoPagamento;