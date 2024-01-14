import axios, { AxiosStatic } from "axios";
import Checkout from "../../../../domain/entity/checkout";
import IPaymentMethods from "../IPaymentsMethods";

class MPagamento implements IPaymentMethods {
    
    public auth_token: string;

    public url: string;

    public http: AxiosStatic;

    constructor () {
        this.auth_token = 'TEST-8926445123950097-011307-ee5dc50bf53c38a033fe5da4c9acc9c1__LD_LB__-209191463'
        this.url = 'https://api.mercadopago.com/v1/'; 
    }
    
    public storePix = async (checkout: Checkout) => {
        const response =  await fetch(`${this.url}payments`,{
            method: 'POST',
            body: JSON.stringify({
                "transaction_amount" : checkout.pedido.getValorTotal(),
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

    public storeCard = async (checkout: Checkout) => {
        throw new Error("Method not implemented.");
    }

    public find = async (id: BigInt) => {
        throw new Error("Method not implemented.");
    }
    
}

export default MPagamento;

