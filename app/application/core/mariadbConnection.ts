import * as mariadb from 'mariadb';

class MysqlConnection
{

    connection: mariadb.Connection;

    constructor(){
        this.connect();
    }

    async connect(){
        this.connection = await mariadb.createConnection({
            host: process.env.MARIADB_HOST,
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASS,
            database: process.env.MARIADB_DATABASE,
            port : parseInt(process.env.MARIADB_PORT),
        });
        console.log("SUCCESS:", `Conexão estabelecida host: ${process.env.MARIADB_HOST}:${process.env.MARIADB_PORT}`);
        
        await this.connection.query(`
            CREATE TABLE IF NOT EXISTS customers (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(200) not null,
                email VARCHAR(245) not null unique,
                cpf_cnpj VARCHAR(20) not null unique,
                created datetime null,
                modified datetime null
            )  ENGINE=INNODB;

            CREATE TABLE IF NOT EXISTS categories (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(200) not null,
                created datetime null,
                modified datetime null
            )  ENGINE=INNODB;
        `);
    }

    public conn() {
        return this.connection;
    }
}

export default MysqlConnection