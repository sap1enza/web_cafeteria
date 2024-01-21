import Categoria from "../domain/entity/categoria";
import IRepository from "../interfaces/IReporitory";
import {IDataBase} from "../interfaces/IDataBase";

class CategoriaRepository extends IRepository{
    private repositorioDados: IDataBase;

    constructor(database: IDataBase) {
        super(database);
        this.repositorioDados = database;
      }
    async getAll(params) {
        let CONDITIONS = "";
        if (typeof params.name != 'undefined' && params.name != "") {
            CONDITIONS += ` name LIKE '%${params.name}%' `;
        }

        if (CONDITIONS != "") {
            CONDITIONS = ' WHERE ' + CONDITIONS;
        }

        return await this.db.find(`SELECT * FROM categoria ${CONDITIONS};`);
    }

    async update(params: Categoria, id) {
        await this.db.store(
            `UPDATE categoria SET
                name = ?,
                modified = NOW()
             WHERE id = ?;
            `, [params.name, id],new Date()); 
        return new Categoria(params.name, id,);
    }

    async store(params: Categoria) {
        let data = await this.db.store(
            `INSERT INTO categoria 
                (name,created, modified) 
             VALUES 
                (
                    ?,
                    NOW(), 
                    NOW()
                );
            `, [params.name],new Date()); 
        return new Categoria(
            params.name,
            parseInt(data.insertId)
        )
    }

    async delete(id) {
        return await this.db.delete(`DELETE FROM categoria where id = ${id};`);
    }

    async findById(id) : Promise<Categoria> {
        let data = await this.db.find(`SELECT * FROM categoria where id = ${id};`);
        if (data.length>0) {
            return new Categoria(data[0].name, data[0].id);
        } 
        return new Categoria();
    }

}

export default CategoriaRepository;