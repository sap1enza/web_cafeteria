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
        return new Category(params.name, id);
    }

    async store(params: Category) {
        let data = await this.db.store(
            `INSERT INTO categories 
                (name,created, modified) 
             VALUES 
                (
                    ?,
                    NOW(), 
                    NOW()
                );
            `, [params.name]); 
        return new Category(
            params.name,
            parseInt(data.insertId)
        )
    }

    async delete(id) {
        return await this.db.delete(`DELETE FROM categories where id = ${id};`);
    }

    async findById(id) : Promise<Category> {
        let data = await this.db.find(`SELECT * FROM categories where id = ${id};`);
        if (data.length>0) {
            return new Category(data[0].name, data[0].id);
        } 
        return new Category();
    }

}

export default CategoriesRepository;