import Category from "../../domain/entity/category";
import IRepository from "./IReporitory";

class CategoriesRepository extends IRepository{
    
    async getAll(params) {
        let CONDITIONS = "";
        if (typeof params.name != 'undefined' && params.name != "") {
            CONDITIONS += ` name LIKE '%${params.name}%' `;
        }

        if (CONDITIONS != "") {
            CONDITIONS = ' WHERE ' + CONDITIONS;
        }

        return await this.db.find(`SELECT * FROM categories ${CONDITIONS};`);
    }

    async update(params: Category, id) {
        await this.db.store(
            `UPDATE categories SET
                name = ?,
                modified = NOW()
             WHERE id = ?;
            `, [params.name, id]); 
        params.id = id;
        return params;
    }

    async store(params: Category) {
        return await this.db.store(
            `INSERT INTO categories 
                (name,created, modified) 
             VALUES 
                (
                    ?,
                    NOW(), 
                    NOW()
                );
            `, [params.name]); 
    }

    async delete(id) {
        return await this.db.delete(`DELETE FROM categories where id = ${id};`);
    }

    async findById(id) {
        let data = await this.db.find(`SELECT * FROM categories where id = ${id};`);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }

}

export default CategoriesRepository;