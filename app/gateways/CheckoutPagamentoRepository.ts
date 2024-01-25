import Checkout from "../entity/checkout";
import ICheckout from "../interfaces/ICheckout";
import { IDataBase } from "../interfaces/IDataBase";

class CheckoutPagamentoRepository implements ICheckout
{
    private nomeTabela = "checkout";
    public db: IDataBase;
    constructor(database: IDataBase) {
       // super(database);
        this.db = database;
      }
    findById = async(id: any) => {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "id", valor: id }]);
        if (data.length > 0) {
            return new Checkout(data);
        }
        else
            return null;
    }
    getAll(params: any) {
        throw new Error("Method not implemented.");
    }

    update = async (checkout: Checkout, id) => {
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
                external_reference = ?,
                modified = NOW()
            WHERE id = ?
            `, [
                checkout.uuid,
                checkout.getStatus(),
                checkout.metodoPagamento.payment_method_id,
                checkout.pedido.id,
                checkout.metodoPagamento.number,
                checkout.metodoPagamento.cvv,
                checkout.metodoPagamento.expirationDate,
                checkout.metodoPagamento.payer.name,
                checkout.metodoPagamento.payer.email,
                checkout.metodoPagamento.payer.document,
                checkout.pedido.getValorTotal(),
                checkout.payload,
                checkout.external_reference,
                id
            ]);

        return new Checkout(
            checkout.pedido,
            checkout.metodoPagamento,
            parseInt(data.insertId)
        )
    }

    public store = async (checkout: Checkout) => {
        let data = await this.db.store(
            this.nomeTabela,
            [{ campo: "uuid", valor: checkout.uuid }, 
            { campo: "status", valor: checkout.getStatus() },
            { campo: "payment_method_id", valor: checkout.getPaymentMethod()},
            { campo: "pedido_id", valor: checkout.pedido.id },
            { campo: "card_number", valor: checkout.metodoPagamento.number },
            { campo: "card_cvv", valor: checkout.metodoPagamento.cvv },
            { campo: "card_expiration_date", valor: checkout.metodoPagamento.expirationDate },
            { campo: "payer_name", valor: checkout.metodoPagamento.payer.name },
            { campo: "payer_email", valor: checkout.metodoPagamento.payer.email },
            { campo: "payer_document", valor: checkout.metodoPagamento.payer.document },
            { campo: "total_value", valor: checkout.pedido.getValorTotal() },
            { campo: "created", valor:  new Date()}, 
            { campo: "modified", valor: new Date() }]);

        // let data = await this.db.store(
        //     `INSERT INTO checkout
        //         (
        //             uuid,
        //             status,
        //             payment_method_id,
        //             pedido_id,
        //             card_number,
        //             card_cvv,
        //             card_expiration_date,
        //             payer_name,
        //             payer_email,
        //             payer_document,
        //             total_value,
        //             created,
        //             modified
        //         )
        //             VALUES
        //         (
        //             ?,
        //             ?,
        //             ?,
        //             ?,
        //             ?,
        //             ?,
        //             ?,
        //             ?,
        //             ?,
        //             ?,
        //             ?,
        //             NOW(),
        //             NOW()
        //         );
        //     `, [
        //         checkout.uuid,
        //         checkout.getStatus(),
        //         checkout.getPaymentMethod(),
        //         checkout.pedido.id,
        //         checkout.metodoPagamento.number,
        //         checkout.metodoPagamento.cvv,
        //         checkout.metodoPagamento.expirationDate,
        //         checkout.metodoPagamento.payer.name,
        //         checkout.metodoPagamento.payer.email,
        //         checkout.metodoPagamento.payer.document ,
        //         checkout.pedido.getValorTotal()
        //     ]);

        return new Checkout(
            checkout.pedido,
            checkout.metodoPagamento,
            parseInt(data.insertId)
        )
    }


    delete(id: any) {
        throw new Error("Method not implemented.");
    }

    public findByExternalReference = async (id: BigInteger) => {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "external_reference", valor: id }]);
        if (data.length > 0) {
            return new data;
        }
        else
            return null;


        // let data = await this.db.find(`SELECT * FROM checkout where external_reference = ${id};`);

        // if (data.length > 0) {
        //     return data[0];
        // } else {
        //     return null;
        // }
    }

    public findByIdPedido = async (pedido_id: BigInteger) => {
        let data  = await this.db.find(this.nomeTabela, null ,[{ campo: "pedido_id", valor: pedido_id,}]);
        console.log(data);
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