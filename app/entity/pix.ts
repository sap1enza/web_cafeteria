import IMetodoPagamento from "./IMetodoPagamento";
import Payer from "./payer";

class Pix implements IMetodoPagamento {
    constructor(readonly payer: Payer) {}
    number: string = null;
    cvv: string  = null;
    expirationDate: string  = null;
}

export default Pix;