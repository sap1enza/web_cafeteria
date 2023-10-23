import OrderProduct from "../../domain/entity/order_product";
import IRepository from "./IReporitory";

class OrderProductsRepository extends IRepository{

    public getAll = async (params: any) => {
        let CONDITIONS = "";

        if (CONDITIONS != "") {
            CONDITIONS = ' WHERE ' + CONDITIONS;
        }

        return await this.db.find(`SELECT * FROM order_products ${CONDITIONS};`);
    }

    public store = async(order_product: OrderProduct) => {
        let data = await this.db.store(
            `INSERT INTO order_products
                (order_id, product_id, created, modified)
             VALUES
                (
                    ?,
                    ?,
                    NOW(),
                    NOW()
                );
            `, [order_product.order.id, order_product.product.id]);
        return new OrderProduct(
            order_product.order.id,
            order_product.product.id,
            parseInt(data.insertId)
        );
    }

    public update = async (order_product: OrderProduct, id: BigInteger) => {
        await this.db.store(
            `UPDATE order_products SET
                order_id = ?,
                product_id = ?,
                modified = NOW()
            WHERE id = ?;
            `, [order_product.order.id, order_product.product.id, id]);
        return new OrderProduct(
            order_product.order,
            order_product.product,
            id
        );
    }

    public delete = async (id: BigInteger) => {
        return await this.db.delete(`DELETE FROM order_products where id = ${id};`);
    }

    public findById = async (id: BigInteger) => {
        let data = await this.db.find(`SELECT * FROM order_products where id = ${id};`);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }
}

export default OrderProductsRepository;
