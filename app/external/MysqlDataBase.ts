import {IDataBase} from '../interfaces/IDataBase';
import MysqlConnection from './mariadbConnection';
import { ParametroBd } from "../types";

interface parametros {
    restricao: string;
    valores: any[];
    order: string;
    condition: string;
  }

export class MysqlDataBase implements IDataBase {

    private db: MysqlConnection;
    

    constructor(){
        //super();
        this.db = new MysqlConnection();
    }

    async store(query: string, data: any) {
        return await this.db.conn().query(query, data);
    }
    async update(query: string, data: any) {
        return await this.db.conn().query(query, data);
    }
    async delete(query: string) {
        return await this.db.conn().query(query);
    }
    // async find(query: string) {
    //     return await this.db.conn().query(query);
    // }
    async query(query: string) {
        return await this.db.conn().query(query)
    }
    async find(nomeTabela: string, campos: string[] | null, parametros: ParametroBd[]){
        const camposBusca = this.ajustarCamposExpressao(campos);
        const parametrosBusca = this.prepararParametrosBusca(parametros);

        const sql = `
          SELECT ${camposBusca} 
          FROM ${nomeTabela}
          ${parametrosBusca.restricao}
        `;
        // console.log(sql);
        // console.log(parametrosBusca.valores);
        const rows = await this.db.conn().query(sql, parametrosBusca.valores);
        console.log(rows);
        return rows;
    }
    
    //metodos auxiliares
    private ajustarCamposExpressao(campos: string[] | undefined | null): string {
        if (campos === undefined || campos === null) {
          return " * ";
        } else if (campos.length == 0) {
          return " * ";
        } else {
          return campos.join(", ");
        }
    }
    private prepararParametrosBusca(
        params: ParametroBd[] | null | undefined
      ): parametros {
        if (params === null || params === undefined) {
          return {
            restricao: "",
            valores: [],
            order:"",
            condition:"",
          };
        }
    
        const camposRestricao: string[] = [];
        const valores: any[] = [];
        const order: string[] = [];

        params.forEach(function (item) {

          item.condition= item.condition === undefined ? "=": item.condition;
            
          camposRestricao.push(`${item.campo} ${item.condition} ?`);
          valores.push(item.valor);
          order.push(item.order);
        });
        return {
          restricao: `WHERE ${camposRestricao.join(" AND ")}`,
          valores: valores,
          order: `Order by ${order.join(" , ")}`,
          condition:"",
        };
    }

    async getProdutosDoPedido(id){
        let query = `SELECT p.* FROM pedido_produtos pp
        inner join  produto p 
        on pp.product_id= p.id
        where pp.order_id = ${id};`
        return await this.db.conn().query(query)
    };

    async getMultipleIdsProduto(ids: string[]){
        const query = `SELECT * FROM produto WHERE id IN (${ids})`
        return await this.db.conn().query(query)

    }
}

export default MysqlDataBase;