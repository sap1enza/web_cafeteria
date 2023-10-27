import PedidoProduto from "../../domain/entity/pedido_produto";
import IRepository from "./IReporitory";

class PedidoProdutosRepository extends IRepository{

    public getAll = async (params: any) => {
        let CONDITIONS = "";

        if (CONDITIONS != "") {
            CONDITIONS = ' WHERE ' + CONDITIONS;
        }

        return await this.db.find(`SELECT * FROM pedido_produtos ${CONDITIONS};`);
    }

    public store = async(pedido_produto: PedidoProduto) => {
        let data = await this.db.store(
            `INSERT INTO pedido_produtos
                (order_id, product_id, created, modified)
             VALUES
                (
                    ?,
                    ?,
                    NOW(),
                    NOW()
                );
            `, [pedido_produto.pedido.id, pedido_produto.produto.id]);
        return new PedidoProduto(
            pedido_produto.pedido.id,
            pedido_produto.produto.id,
            parseInt(data.insertId)
        );
    }

    public update = async (pedido_produto: PedidoProduto, id: BigInteger) => {
        await this.db.store(
            `UPDATE pedido_produtos SET
                order_id = ?,
                product_id = ?,
                modified = NOW()
            WHERE id = ?;
            `, [pedido_produto.pedido.id, pedido_produto.produto.id, id]);
        return new PedidoProduto(
            pedido_produto.pedido,
            pedido_produto.produto,
            id
        );
    }

    public delete = async (id: BigInteger) => {
        return await this.db.delete(`DELETE FROM pedido_produtos where id = ${id};`);
    }

    public findById = async (id: BigInteger) => {
        let data = await this.db.find(`SELECT * FROM pedido_produtos where id = ${id};`);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }

    public findByIdpedido = async (id: BigInteger) => {
        let data = await this.db.find(`SELECT * FROM pedido_produtos where order_id = ${id};`);
        if (data.length>0) {
            return data;
        } else {
            return null;
        }
    }
}

export default PedidoProdutosRepository;
