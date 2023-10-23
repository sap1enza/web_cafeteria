import Order from "../../domain/entity/order";
import IRepository from "./IReporitory";

class OrderRepository extends IRepository{

    public getAll = async (params: any) => {
        let CONDITIONS = "";

        if (typeof params.status != 'undefined' && params.status != "") {
            CONDITIONS += ` status LIKE '%${params.status}%' `;
        }

        if (CONDITIONS != "") {
            CONDITIONS = ' WHERE ' + CONDITIONS;
        }

        return await this.db.find(`SELECT * FROM orders ${CONDITIONS};`);
    }

    public store = async(order: Order) => {
        let data = await this.db.store(
            `INSERT INTO orders
                (customer_id, status, created, modified)
             VALUES
                (
                    ?,
                    ?,
                    NOW(),
                    NOW()
                );
            `, [order.customer.id, order.status]);
        return new Order(
            order.customer,
            order.status,
            parseInt(data.insertId)
        );
    }

    public update = async (order: Order, id: BigInteger) => {
        await this.db.store(
            `UPDATE orders SET
                customer_id = ?
                status = ?,
                modified = NOW()
            WHERE id = ?;
            `, [order.customer.id, order.status, id]);
        return new Order(
            order.customer,
            order.status,
            id
        );
    }

    public delete = async (id: BigInteger) => {
        return await this.db.delete(`DELETE FROM orders where id = ${id};`);
    }

    public findById = async (id: BigInteger) => {
        let data = await this.db.find(`SELECT * FROM orders where id = ${id};`);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }
}

export default OrderRepository;
