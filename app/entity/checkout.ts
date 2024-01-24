import { UUID } from "crypto";
import Cartao from "./cartao";
import Pedido from "./pedido";
import { v4 as uuidv4 } from 'uuid';
import { StatusCheckout } from "./enum/statusCheckout";
import IMetodoPagamento from "./IMetodoPagamento";

class Checkout {

    public uuid: String;

    private status: Number;

    public payload : string;

    private payment_method : number;
    
    constructor(readonly pedido: Pedido, readonly metodoPagamento?: IMetodoPagamento, readonly id?) {
        this.uuid = uuidv4();
        this.status = StatusCheckout.AGUARDANDO_PAGAMENTO;
    }

    public setPaymentMethod = (value: number) => {
        this.payment_method = value;
    }

    public getPaymentMethod = () : number => {
        return this.payment_method;
    }

    public setStatus = (status: Number) => {
        this.status = status;
    }

    public getStatus = () => {
        return this.status;
    }

}

export default Checkout;