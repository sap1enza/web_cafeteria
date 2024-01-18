import Cliente from "../domain/entity/cliente";
import IRepository from "./IReporitory";

class ClienteRepository extends IRepository
{

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

        return await this.db.find(`SELECT * FROM cliente ${CONDITIONS};`);
    }

    public update = async (cliente: Cliente, id: BigInteger) => {
        await this.db.store(
            `UPDATE cliente SET
                name = ?,
                email = ?,
                cpf_cnpj = ?,
                modified = NOW()
             WHERE id = ?;
            `, [cliente.name, cliente.email, 
                cliente.cpf_cnpj, id]); 
        cliente.id = id;
        return cliente;
    }

    public store = async (cliente: Cliente) => {
        return await this.db.store(
            `INSERT INTO cliente 
                (name,email, cpf_cnpj, created, modified) 
             VALUES 
                (
                    ?,
                    ?,
                    ?,
                    NOW(), 
                    NOW()
                );
            `, [cliente.name, cliente.email, cliente.cpf_cnpj]); 
    }

    public delete = async (id: BigInteger) => {
        return await this.db.delete(`DELETE FROM cliente where id = ${id};`);
    }
    
    public findById = async (id: BigInteger) : Promise<Cliente> => {
        let data = await this.db.find(`SELECT * FROM cliente where id = ${id};`);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }

    public findByCPF = async (cpf_cnpj: String) => {
        let data = await this.db.find(`SELECT * FROM cliente where cpf_cnpj = ${cpf_cnpj};`);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }
}

export default ClienteRepository;