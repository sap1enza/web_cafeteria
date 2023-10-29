import Pedido from "../../domain/entity/pedido";
import ClienteRepository from "./ClienteRepository";
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
            `, [pedido.cliente.id, pedido.getStatus()]);
        return new Pedido(
            pedido.cliente,
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
            `, [pedido.cliente.id, pedido.getStatus(), id]);
        return new Pedido(
            pedido.cliente,
            id
        );
    }

    public delete = async (id: BigInteger) => {
        return await this.db.delete(`DELETE FROM pedidos where id = ${id};`);
    }

    public findById = async (id: BigInteger) : Promise<Pedido> => {
        let data = await this.db.find(`SELECT * FROM pedidos where id = ${id};`);
        if (data.length>0) {
            let cliente = await new ClienteRepository(this.db).findById(data[0].customer_id)
            let pedido = new Pedido(
                cliente,
                data[0].id
            );
            pedido.setStatus(data[0].getStatus())
            return pedido;
        } else {
            return null;
        }
    }
}

export default PedidoRepository;
