import Cliente from "../domain/entity/cliente";
import ICliente from "../interfaces/ICliente";
import { IDataBase } from "../interfaces/IDataBase";

class ClienteRepository implements ICliente
{
    public db: IDataBase;
    private nomeTabela = "cliente";
    constructor(database: IDataBase) {
       // super(database);
        this.db = database;
      }

    public getAll = async (params) => {
        let CONDITIONS = false;
        let result;
        let filtroCampo, filtroValor;

        if (typeof params.email != 'undefined' && params.email != "") {
            filtroCampo = 'email'; 
            filtroValor= params.email;
            CONDITIONS = true;
        }

        if (typeof params.cpf_cnpj != 'undefined' && params.cpf_cnpj != "") {
            filtroCampo = 'cpf_cnpj'; 
            filtroValor= params.cpf_cnpj;
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
                [{ campo: filtroCampo, valor: filtroValor}]
            );
        }

        if (result === null || result === undefined) return null;
        if (result.length < 1) return null;

        const row: Cliente[] = result;
        return row;

        //return await this.db.find(`SELECT * FROM cliente ${CONDITIONS};`);
    }

    public update = async (cliente: Cliente, id: BigInteger) => {
        this.db.update(
            this.nomeTabela,
            [{ campo: "name", valor: cliente.name }, 
            { campo: "email", valor: cliente.email }, 
            { campo: "cpf_cnpj", valor: cliente.cpf_cnpj } ,
            { campo: "modified", valor: new Date() }],
            [{ campo: "id", valor: id }]);  
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
        return await this.db.delete(
            this.nomeTabela,
            [{ campo: "id", valor: id }]);;
    }
    
    public findById = async (id: BigInteger) : Promise<Cliente> => {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "id", valor: id }]);
           return data;

    }

    public findByCPF = async (cpf_cnpj: String) => {
        let data = await this.db.find(
            this.nomeTabela,
            null,
            [{ campo: "cpf_cnpj", valor: cpf_cnpj }]);
        if (data.length>0) {
            return data[0];
        } else {
            return null;
        }
    }
}

export default ClienteRepository;