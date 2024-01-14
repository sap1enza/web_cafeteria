import axios, { AxiosStatic } from "axios";
import Checkout from "../../../../domain/entity/checkout";
import IPaymentMethods from "../IPaymentsMethods";

class MPagamento implements IPaymentMethods {
    
    public auth_token: string;

    public url: string;

    public http: AxiosStatic;

    constructor () {
        this.auth_token = process.env.MP_CLIENT_SECRET
        this.url = process.env.MP_URL; 
    }
    
    public storePix = async (checkout : Checkout) => {
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

    public storeCard = async (checkout : Checkout) => {
        throw new Error("Method not implemented.");
    }

    public find = async (id: BigInt) => {
        throw new Error("Method not implemented.");
    }
    
}

export default MPagamento;

