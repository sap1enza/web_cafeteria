import Checkout from "../domain/entity/checkout";
import { StatusCheckout } from "../domain/entity/enum/statusCheckout";
import IRepository from "./IReporitory";

class CheckoutPagamentoRepository extends IRepository
{
    findById = async(id: any) => {
        let data = await this.db.find(`SELECT * FROM checkout where id = ${id};`);

        if (data.length > 0) {
            return data[0];
        } else {
            return null;
        }
    }
    getAll(params: any) {
        throw new Error("Method not implemented.");
    }
    
    update = async (chekout: Checkout, id) => {
        let data = await this.db.store(
            `UPDATE checkout SET
                uuid = ?,
                status = ?,
                payment_method_id = ?,
                pedido_id = ?,
                card_number = ?,
                card_cvv = ?,
                card_expiration_date = ?,
                payer_name = ?,
                payer_email = ?,
                payer_document = ?, 
                total_value = ?,
                payload = ?, 
                modified = NOW()
            WHERE id = ?
            `, [
                chekout.uuid, 
                chekout.getStatus(), 
                chekout.getPaymentMethod(), 
                chekout.pedido.id,
                chekout.metodoPagamento.number, 
                chekout.metodoPagamento.cvv, 
                chekout.metodoPagamento.expirationDate, 
                chekout.metodoPagamento.payer.name,
                chekout.metodoPagamento.payer.email,
                chekout.metodoPagamento.payer.document,
                chekout.metodoPagamento.payer.document,
                chekout.pedido.getValorTotal(),
                chekout.payload,
                id
            ]); 

        return new Checkout(
            chekout.pedido,
            chekout.metodoPagamento,
            parseInt(data.insertId)
        )
    }

    public store = async (chekout: Checkout) => {
        let data = await this.db.store(
            `INSERT INTO checkout 
                (
                    uuid, 
                    status,
                    payment_method_id,
                    pedido_id, 
                    card_number, 
                    card_cvv, 
                    card_expiration_date, 
                    payer_name, 
                    payer_email, 
                    payer_document, 
                    total_value, 
                    created, 
                    modified
                ) 
                    VALUES 
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    NOW(), 
                    NOW()
                );
            `, [
                chekout.uuid, 
                chekout.getStatus(),
                chekout.getPaymentMethod(), 
                chekout.pedido.id,
                chekout.metodoPagamento.number, 
                chekout.metodoPagamento.cvv, 
                chekout.metodoPagamento.expirationDate, 
                chekout.metodoPagamento.payer.name,
                chekout.metodoPagamento.payer.email,
                chekout.metodoPagamento.payer.document ,
                chekout.pedido.getValorTotal() 
            ]); 

        return new Checkout(
            chekout.pedido,
            chekout.metodoPagamento,
            parseInt(data.insertId)
        )
    }


    delete(id: any) {
        throw new Error("Method not implemented.");
    }


    public findByIdPedido = async (pedido_id: BigInteger) => {
        let data = await this.db.find(`SELECT * FROM checkout where pedido_id = ${pedido_id};`);
        if (data.length>0) {
            return  {
                id : data[0].status,
                name : ""
            }
        }
        else{
            return null;
        }
    }
    
}

export default CheckoutPagamentoRepository;