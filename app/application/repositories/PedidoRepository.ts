import Pedido from "../../domain/entity/pedido";
import IRepository from "./IReporitory";

class PedidoRepository extends IRepository{

    public getAll = async (params: any) => {
        let CONDITIONS = "";

        if (typeof params.status != 'undefined' && params.status != "") {
            CONDITIONS += ` status LIKE '%${params.status}%' `;
        }

        if (CONDITIONS != "") {
            CONDITIONS = ' WHERE ' + CONDITIONS;
        }

        return await this.db.find(`SELECT * FROM pedidos ${CONDITIONS};`);
    }

    public store = async(pedido: Pedido) => {
        let data = await this.db.store(
            `INSERT INTO pedidos
                (customer_id, status, created, modified)
             VALUES
                (
                    ?,
                    ?,
                    NOW(),
                    NOW()
                );
            `, [pedido.cliente.id, pedido.status]);
        return new Pedido(
            pedido.cliente,
            pedido.status,
            parseInt(data.insertId)
        );
    }

    public update = async (pedido: Pedido, id: BigInteger) => {
        await this.db.store(
            `UPDATE pedidos SET
                customer_id = ?,
                status = ?,
                modified = NOW()
            WHERE id = ?;
            `, [pedido.cliente.id, pedido.status, id]);
        return new Pedido(
            pedido.cliente,
            pedido.status,
            id
        );
    }

    public delete = async (id: BigInteger) => {
        return await this.db.delete(`DELETE FROM pedidos where id = ${id};`);
    }

    public findById = async (id: BigInteger) => {
        let data = await this.db.find(`SELECT * FROM pedidos where id = ${id};`);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }
}

export default PedidoRepository;
