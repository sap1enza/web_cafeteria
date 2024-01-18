import Pedido from "../../domain/entity/pedido";
import ClienteRepository from "./ClienteRepository";
import IRepository from "./IReporitory";
import Produto from '../../domain/entity/produto';

class PedidoRepository extends IRepository{

    public getAll = async (params: any) => {
        let CONDITIONS = "";
        console.log(params);
        if (typeof params.status != 'undefined' && params.status != "") {
            CONDITIONS += ` status LIKE '%${params.status}%' `;
        }

        if (CONDITIONS != "") {
            CONDITIONS = ' WHERE ' + CONDITIONS;
            CONDITIONS +=" AND status != 4 order by status desc, created desc";
        }
        else{
            CONDITIONS =" WHERE status != 4 order by status desc, created desc";
        }
       
        return await this.db.find(`SELECT * FROM pedidos  ${CONDITIONS};`);

        // return await this.db.find(`SELECT p.id AS pedido_id, p.customer_id, p.status AS pedido_status,
        // pp.product_id, pp.created, pp.modified FROM pedidos p inner join pedido_produtos pp on p.id=pp.order_id  ${CONDITIONS};`);
    }

    public store = async(pedido: Pedido) => {
        console.log(pedido.cliente.id, pedido.getStatus(), pedido.getValorTotal());
        
        let data = await this.db.store(
            `INSERT INTO pedidos
                (customer_id, status, total_value, created, modified)
             VALUES
                (
                    ?,
                    ?,
                    ?,
                    NOW(),
                    NOW()
                );
            `, [pedido.cliente.id, pedido.getStatus(), pedido.getValorTotal()]);
        return new Pedido(
            pedido.cliente,
            pedido.getStatus(),
            parseInt(data.insertId)
        );
    }

    public adicionarProdutoAoPedido = async (pedidoId: Pedido, produtoId: Produto) => {
        let data = await this.db.store( `
            INSERT INTO pedido_produtos (order_id, product_id, created, modified)
            VALUES (?, ?, NOW(), NOW());
        `,[pedidoId, produtoId]);

        return data.insertId;
    }

    public update = async (pedido: Pedido, id: BigInteger) => {
        await this.db.store(
            `UPDATE pedidos SET
                customer_id = ?,
                status = ?,
                total_value = ?,
                modified = NOW()
            WHERE id = ?;
            `, [pedido.cliente.id, pedido.getStatus(), pedido.getValorTotal(), id]);
        return new Pedido(
            pedido.cliente,
            pedido.getStatus(),
            id
        );
    }

    public delete = async (id: BigInteger) => {
        return await this.db.delete(`DELETE FROM pedidos where id = ${id};`);
    }

    public findById = async (id: BigInteger) : Promise<Pedido> => {
        let data = await this.db.find(`SELECT * FROM pedidos where id = ${id};`);
        let dataPedidos: Produto[] = await this.db.find(`SELECT p.* FROM pedido_produtos pp
                                                          inner join  produto p 
                                                          on pp.product_id= p.id
                                                          where pp.order_id = ${id};`);
        if (data.length>0) {
            let cliente = await new ClienteRepository(this.db).findById(data[0].customer_id)
            let pedido = new Pedido(
                cliente,
                data[0].status,
                data[0].id,
                data[0].valorTotal
            );
             dataPedidos.forEach(produto => {
                 pedido.adicionarProduto(produto)   
             });  
            return pedido;
        } else {
            return null;
        }
    }
}

export default PedidoRepository;
