import IRepository from "../interfaces/IReporitory";
import Produto from '../domain/entity/produto';
import { Console } from "console";
import IProduto from "../interfaces/IProduto";
import { IDataBase } from "../interfaces/IDataBase";

class ProdutoRepository implements IProduto{
    
    public db: IDataBase;

    constructor(database: IDataBase) {
        this.db = database;
      }

    public getAll = async (params: any) => {
        let CONDITIONS = "";

        if (typeof params.title != 'undefined' && params.title != "") {
            CONDITIONS += ` title LIKE '%${params.title}%' `;
        }

        if (CONDITIONS != "") {
            CONDITIONS = ' WHERE ' + CONDITIONS;
        }

        return await this.db.find(`SELECT * FROM produto ${CONDITIONS};`);
    }

    public store = async(produto: Produto) => {
        let data = await this.db.store(
            `INSERT INTO produto 
                (title, value, description, category_id, created, modified) 
             VALUES 
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    NOW(), 
                    NOW()
                );
            `, [produto.title, produto.value, produto.description, produto.categoria.id]);
        return new Produto(
            produto.title,
            produto.value,
            produto.categoria,
            produto.description,
            parseInt(data.insertId)
        );
    }

    public update = async (produto: Produto, id: BigInteger) => {
        await this.db.store(
            `UPDATE produto SET
                title = ?,
                value = ?,
                description = ?,
                category_id = ?,
                modified = NOW()
             WHERE id = ?;
            `, [produto.title, produto.value, produto.description, produto.categoria.id, id]); 
        return new Produto(
            produto.title,
            produto.value,
            produto.categoria,
            produto.description,
            id
        );
    }

    public delete = async (id: BigInteger) => {
        return await this.db.delete(`DELETE FROM produto where id = ${id};`);
    }

    public findById = async (id: BigInteger) => {
        let data = await this.db.find(`SELECT * FROM produto where id = ${id};`);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }

    public findByMultipleIds = async (ids: number[]) => {
        if (ids.length === 0) {
            return null; 
        }
    
        const formattedIds = ids.join(', ');
    
        const query = `SELECT * FROM produto WHERE id IN (${formattedIds})`;
        const data = await this.db.find(query);
    
        if (data.length > 0) {
            return data;
        } else {
            return null;
        }
    }
    

    public findByCategory = async (category_id: BigInteger) => {
        let data = await this.db.find(`SELECT * FROM produto where category_id = ${category_id};`);
        if (data.length>0) {
            return data;
        } else {
            return null;
        }
    }
}

export default ProdutoRepository;