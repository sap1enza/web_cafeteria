import Customer from "../../domain/entity/customer";
import IDataBase from "../database/IDataBase";

class CustomerRepository
{
    public db;

    constructor (database: IDataBase) {
        this.db = database;
    }

    public getAll = async (params) => {
        let CONDITIONS = "";
        if (typeof params.email != 'undefined' && params.email != "") {
            CONDITIONS += ` email LIKE '%${params.email}%' `;
        }

        if (typeof params.cpf_cnpj != 'undefined' && params.cpf_cnpj != "") {
            CONDITIONS += ` cpf_cnpj LIKE '%${params.cpf_cnpj}%' `;
        }

        if (CONDITIONS != "") {
            CONDITIONS = ' WHERE ' + CONDITIONS;
        }

        return await this.db.find(`SELECT * FROM customers ${CONDITIONS};`);
    }

    public update = async (customer: Customer, id) => {
        await this.db.store(
            `UPDATE customers SET
                name = ?,
                email = ?,
                cpf_cnpj = ?,
                modified = NOW()
             WHERE id = ?;
            `, [customer.name, customer.email, 
                customer.cpf_cnpj, id]); 
        customer.id = id;
        return customer;
    }

    public store = async (customer: Customer) => {
        return await this.db.store(
            `INSERT INTO customers 
                (name,email, cpf_cnpj, created, modified) 
             VALUES 
                (
                    ?,
                    ?,
                    ?,
                    NOW(), 
                    NOW()
                );
            `, [customer.name, customer.email, customer.cpf_cnpj]); 
    }

    public delete = async (id: BigInteger) => {
        return await this.db.delete(`DELETE FROM customers where id = ${id};`);
    }
    public findById = async (id) => {
        let data = await this.db.find(`SELECT * FROM customers where id = ${id};`);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }

    public findByCPF = async (cpf_cnpj: String) => {
        let data = await this.db.find(`SELECT * FROM customers where cpf_cnpj = ${cpf_cnpj};`);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }
}

export default CustomerRepository;