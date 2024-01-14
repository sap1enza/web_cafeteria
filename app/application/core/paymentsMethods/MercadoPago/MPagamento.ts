import axios, { AxiosStatic } from "axios";
import Checkout from "../../../../domain/entity/checkout";
import IPaymentMethods from "../IPaymentsMethods";
import PaymentoMethods from "../PaymentoMethods";

class MPagamento implements IPaymentMethods {
    
    public auth_token: string;

    public url: string;

    public http: AxiosStatic;

    constructor () {
        this.auth_token = process.env.MP_CLIENT_SECRET
        this.url = process.env.MP_URL; 
    }

    public store = async (checkout: Checkout) => {
        if (checkout.getPaymentMethod() == PaymentoMethods.PIX) {
            return await this.pix(checkout);
        } else if (checkout.getPaymentMethod() == PaymentoMethods.CARD_DEBIT) {
            return await this.card(checkout);
        } else {
            throw new Error("Payment Method not implemented.");
        }
    }
    
    pix = async (checkout : Checkout) => {
        const response =  await fetch(`${this.url}payments`,{
            method: 'POST',
            body: JSON.stringify({
                "transaction_amount" :checkout.pedido.getValorTotal(),
                "description" : `MERCADO PAGO PAGAMENTO PIX - Compra segura cliente ${checkout.pedido.cliente.email}`,
                "payment_method_id" : "pix",
                "external_reference" : checkout.uuid,
                "payer" : {
                    "email" : checkout.pedido.cliente.email,
                }
            }),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${this.auth_token}` 
            }
        });
        return await response.json();
    }

    card = async (checkout : Checkout) => {
        throw new Error("Method not implemented.");
    }

    public find = async (id: BigInt) => {
        throw new Error("Method not implemented.");
    }
    
}

export default MPagamento;

