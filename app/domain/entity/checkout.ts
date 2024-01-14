import { UUID } from "crypto";
import Cartao from "./cartao";
import Pedido from "./pedido";
import { v4 as uuidv4 } from 'uuid';
import { StatusCheckout } from "./enum/statusCheckout";

class Checkout {

    public uuid: String;

    private status: Number;

    public payload : string;
    
    constructor(readonly pedido: Pedido, readonly cartao?: Cartao, readonly id?) {
        this.uuid = uuidv4();
        this.status = StatusCheckout.AGUARDANDO_PAGAMENTO;
    }

    public setStatus = (status: Number) => {
        this.status = status;
    }

    public getStatus = () => {
        return this.status;
    }

}

export default Checkout;