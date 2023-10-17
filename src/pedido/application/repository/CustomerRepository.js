class CustomerRepository
{

    constructor (database) {
        this.db = database;
    }

    async store(client) {
        return await this.db.store(
            `INSERT INTO customers 
                (name,email, cpf_cnpj, birthday, created, modified) 
             VALUES 
                (
                    ?,
                    ?,
                    ?,
                    ?,
                    NOW(), 
                    NOW()
                );
            `, [client.name, client.email, 
                client.cpf_cnpj, client.birthday]);    
    }

    async update(client, id){
        await this.db.store(
            `UPDATE customers SET
                name = ?,
                email = ?,
                cpf_cnpj = ?,
                birthday = ?,
                modified = NOW()
             WHERE id = ?;
            `, [client.name, client.email, 
                client.cpf_cnpj, client.birthday, 
                id]); 
        client.id = id;
        return client;
    }

    async findById(id){
        return await this.db.query(`SELECT * FROM customers where id = ${id};`);
    }

    async all(params){
        return await this.db.query(`SELECT * FROM customers;`);
    }

    async delete(id){
        return await this.db.delete(`DELETE FROM customers where id = ${id};`);
    }

}

export default CustomerRepository