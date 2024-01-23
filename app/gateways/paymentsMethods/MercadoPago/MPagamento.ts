import Checkout from "../../../domain/entity/checkout";
import IPaymentMethods from "../IPaymentsMethods";
import PaymentoMethods from "../PaymentoMethods";
import { StatusCheckout } from '../../../domain/entity/enum/statusCheckout';
import { v4 as uuidv4 } from 'uuid';

class MPagamento implements IPaymentMethods {

    public auth_token: string;

    public url: string;

    public notification_url: string;

    public response;


    constructor () {
        this.auth_token = process.env.MP_CLIENT_SECRET
        this.url = process.env.MP_URL;
        this.notification_url = process.env.MP_NOTIFICATION_URL;
    }

    statusPagamentoMapping = () => {
        switch (this.response['status']) {
            case 'pending':
                return StatusCheckout.AGUARDANDO_PAGAMENTO;
            case 'approved':
            case 'authorized':
                return StatusCheckout.PAGAMENTO_EFETUADO;
            case 'in_process':
            case 'in_mediation':
                return StatusCheckout.AGUARDANDO_PAGAMENTO;
            case 'rejected':
            case 'cancelled':
            case 'refunded':
            case 'charged_back':
                return StatusCheckout.PAGAMENTO_CANCELADO;
            default:
                return StatusCheckout.AGUARDANDO_PAGAMENTO;
        }
    }

    aguardandoPagamento = () : boolean => {
        return this.response['status_detail'] == 'pending_waiting_transfer';
    }

    public store = async (checkout: Checkout) => {
        if (checkout.metodoPagamento.payment_method_id == PaymentoMethods.PIX) {
            return await this.pix(checkout);
        } else if (checkout.metodoPagamento.payment_method_id == PaymentoMethods.CARD_DEBIT) {
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
                "description" : `MERCADO PAGO PAGAMENTO PIX - Compra segura cliente ${checkout.metodoPagamento.payer.email}`,
                "payment_method_id" : "pix",
                "external_reference" : checkout.uuid,
                "notification_url" : this.notification_url,
                "payer" : {
                    "email" : checkout.metodoPagamento.payer.email,
                }
            }),
            headers: {
                "Content-Type" : "application/json",
                "X-Idempotency-Key" : uuidv4(),
                "Authorization" : `Bearer ${this.auth_token}`
            }
        });

        if (response.status >= 300) {
            throw new Error(response.statusText);
        }

        this.response = await response.json();

        let obj = JSON.parse(this.response);

        return this.response;
    }

    card = async (checkout : Checkout) => {
        throw new Error("Method not implemented.");
    }

    public find = async (id: BigInt) => {
        throw new Error("Method not implemented.");
    }
}

export default MPagamento;

