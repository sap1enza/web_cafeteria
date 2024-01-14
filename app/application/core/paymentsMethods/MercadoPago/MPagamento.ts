import axios, { AxiosStatic } from "axios";
import Checkout from "../../../../domain/entity/checkout";
import IPaymentMethods from "../IPaymentsMethods";

class MPagamento implements IPaymentMethods {
    
    public auth_token: string;

    public url: string;

    public http: AxiosStatic;

    constructor (readonly checkout : Checkout) {
        this.auth_token = 'TEST-8926445123950097-011307-ee5dc50bf53c38a033fe5da4c9acc9c1__LD_LB__-209191463'
        this.url = 'https://api.mercadopago.com/v1/'; 
    }
    
    public storePix = async () => {
        const response =  await fetch(`${this.url}payments`,{
            method: 'POST',
            body: JSON.stringify({
                "transaction_amount" : this.checkout.pedido.getValorTotal(),
                "description" : `MERCADO PAGO PAGAMENTO PIX - Compra segura cliente ${this.checkout.pedido.cliente.email}`,
                "payment_method_id" : "pix",
                "external_reference" : this.checkout.uuid,
                "payer" : {
                    "email" : this.checkout.pedido.cliente.email,
                }
            }),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${this.auth_token}` 
            }
        });
        return await response.json();
    }

    public storeCard = async () => {
        throw new Error("Method not implemented.");
    }

    public find = async (id: BigInt) => {
        throw new Error("Method not implemented.");
    }
    
}

export default MPagamento;

