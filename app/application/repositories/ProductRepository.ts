import IRepository from "./IReporitory";
import Product from '../../domain/entity/product';

class ProductRepository extends IRepository{

    public getAll = async (params: any) => {
        let CONDITIONS = "";

        if (typeof params.title != 'undefined' && params.title != "") {
            CONDITIONS += ` title LIKE '%${params.title}%' `;
        }

        if (CONDITIONS != "") {
            CONDITIONS = ' WHERE ' + CONDITIONS;
        }

        return await this.db.find(`SELECT * FROM products ${CONDITIONS};`);
    }

    public store = async(product: Product) => {
        return await this.db.store(
            `INSERT INTO products 
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
            `, [product.title, product.value, product.description, product.category.id]); 
    }

    public update = async (product: Product, id: BigInteger) => {
        await this.db.store(
            `UPDATE products SET
                title = ?,
                value = ?,
                description = ?,
                category_id = ?,
                modified = NOW()
             WHERE id = ?;
            `, [product.title, product.value, product.description, product.category.id, id]); 
        product.id = id;
        return product;
    }

    public delete = async (id: BigInteger) => {
        return await this.db.delete(`DELETE FROM products where id = ${id};`);
    }

    public findById = async (id: BigInteger) => {
        let data = await this.db.find(`SELECT * FROM products where id = ${id};`);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }
}

export default ProductRepository;