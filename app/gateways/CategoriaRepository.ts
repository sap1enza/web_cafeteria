import Categoria from "../domain/entity/categoria";
import IRepository from "../interfaces/IReporitory";
import { IDataBase } from "../interfaces/IDataBase";

class CategoriaRepository implements IRepository {
    public db: IDataBase;

    constructor(database: IDataBase) {
        // super(database);
        this.db = database;
    }
    private nomeTabela = "categoria";

    async getAll(params) {

        let CONDITIONS = false;
        let result;
        if (typeof params.name != 'undefined' && params.name != "") {
            CONDITIONS = true;
        }

        if (!CONDITIONS) {
            result = await this.db.find(
                this.nomeTabela,
                null,
                null
            );
        }
        else {
            result = await this.db.find(
                this.nomeTabela,
                null,
                [{ campo: "name", valor: params.name}]
            );
        }

        if (result === null || result === undefined) return null;
        if (result.length < 1) return null;

        const row: Categoria[] = result;
        return row;
    }

    async update(params: Categoria, id) {
        await this.db.store(
            `UPDATE categoria SET
                name = ?,
                modified = NOW()
             WHERE id = ?;
            `, [params.name, id], new Date());
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
            `, [params.name], new Date());
        return new Categoria(
            params.name,
            parseInt(data.insertId)
        )
    }

    async delete(id) {
        return await this.db.delete(`DELETE FROM categoria where id = ${id};`);
    }

    async findById(id): Promise<Categoria> {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "id", valor: id }]);
        if (data.length > 0) {
            return new Categoria(data[0].name, data[0].id);
        }
        else
            return null;
    }

}

export default CategoriaRepository;