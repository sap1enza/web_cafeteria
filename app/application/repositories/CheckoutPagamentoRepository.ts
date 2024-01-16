import Checkout from "../../domain/entity/checkout";
import IRepository from "./IReporitory";

class CheckoutPagamentoRepository extends IRepository
{
    findById(id: any) {
        throw new Error("Method not implemented.");
    }
    getAll(params: any) {
        throw new Error("Method not implemented.");
    }
    
    update = async (chekout: Checkout, id) => {
        let data = await this.db.store(
            `UPDATE checkout SET
                uuid = ?,
                status = ?,
                pedido_id = ?,
                card_number = ?,
                card_cvv = ?,
                card_expiration_date = ?,
                payer_name = ?,
                payer_email = ?,
                payer_document = ?, 
                total_value = ?, 
                modified = NOW()
            WHERE id = ?
            `, [
                chekout.uuid, 
                chekout.getStatus(), 
                chekout.pedido.id,
                chekout.cartao.number, 
                chekout.cartao.cvv, 
                chekout.cartao.expirationDate, 
                chekout.cartao.payer.name,
                chekout.cartao.payer.email,
                chekout.cartao.payer.document,
                chekout.pedido.getValorTotal(),
                id
            ]); 

        return new Checkout(
            chekout.pedido,
            chekout.cartao,
            parseInt(data.insertId)
        )
    }

    public store = async (chekout: Checkout) => {
        let data = await this.db.store(
            `INSERT INTO checkout 
                (uuid, status, pedido_id, card_number, card_cvv, card_expiration_date, payer_name, payer_email, payer_document, total_value, created, modified) 
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
                    NOW(), 
                    NOW()
                );
            `, [
                chekout.uuid, 
                chekout.getStatus(), 
                chekout.pedido.id,
                chekout.cartao.number, 
                chekout.cartao.cvv, 
                chekout.cartao.expirationDate, 
                chekout.cartao.payer.name,
                chekout.cartao.payer.email,
                chekout.cartao.payer.document ,
                chekout.pedido.getValorTotal() 
            ]); 

        return new Checkout(
            chekout.pedido,
            chekout.cartao,
            parseInt(data.insertId)
        )
    }


    delete(id: any) {
        throw new Error("Method not implemented.");
    }


    public findByIdPedido = async (pedido_id: BigInteger) : Promise<Checkout> => {
        let data = await this.db.find(`SELECT * FROM checkout where pedido_id = ${pedido_id};`);
        if (data.length>0) {
            
            return  data[0].status;
        }
        else{
            return null;
        }
    }
    
}

export default CheckoutPagamentoRepository;