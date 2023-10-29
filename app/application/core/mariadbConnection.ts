import * as mariadb from 'mariadb';

class MysqlConnection
{

    connection: mariadb.Connection = null;

    constructor(){
        this.connect();
    }

    async connect(){
        if (this.connection==null) {
            this.connection = await mariadb.createConnection({
                host: process.env.MARIADB_HOST,
                user: process.env.MARIADB_USER,
                password: process.env.MARIADB_PASS,
                database: process.env.MARIADB_DATABASE,
                port : parseInt(process.env.MARIADB_PORT),
            });
        }

        await this.connection.query(`CREATE TABLE IF NOT EXISTS cliente (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(200) not null,
                email VARCHAR(245) not null unique,
                cpf_cnpj VARCHAR(20) not null unique,
                created datetime null,
                modified datetime null
            )  ENGINE=INNODB;`);

        await this.connection.query(`CREATE TABLE IF NOT EXISTS categoria (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(200) not null unique,
            created datetime null,
            modified datetime null
        )  ENGINE=INNODB;`);

        await this.connection.query(`
            CREATE TABLE IF NOT EXISTS produto (
                id INT PRIMARY KEY AUTO_INCREMENT,
                category_id INT not null,
                title VARCHAR(200) not null unique,
                description text null,
                value decimal(19,2) not null default 0,
                created datetime null,
                modified datetime null
            )  ENGINE=INNODB;
        `);

        await this.connection.query(`
            CREATE TABLE IF NOT EXISTS pedidos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                customer_id INT not null,
                status VARCHAR(200) not null default 'created',
                created datetime null,
                modified datetime null
            )  ENGINE=INNODB;
        `);

        await this.connection.query(`
            CREATE TABLE IF NOT EXISTS pedido_produtos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                order_id INT not null,
                product_id INT not null,
                created datetime null,
                modified datetime null
            )  ENGINE=INNODB;
        `);

        await this.connection.query(`
            CREATE TABLE IF NOT EXISTS checkout (
                id INT PRIMARY KEY AUTO_INCREMENT,
                uuid VARCHAR(254) not null unique,
                status int(11) not null default 1,
                pedido_id int(11) not null,
                card_number varchar(50) not null,
                card_cvv varchar(10) not null,
                card_expiration_date varchar(10) not null,
                payer_name varchar(245) not null,
                payer_email varchar(245) not null,
                payer_document varchar(16) not null,
                created datetime null,
                modified datetime null
            )  ENGINE=INNODB;
        `);        
        
        await this.connection.query(`TRUNCATE TABLE categoria;`);

        await this.connection.query(`
            INSERT INTO categoria (id, name, created, modified) 
            VALUES 
            (1, 'Lanche',NOW(), NOW()), 
            (2, 'Acompanhamento',NOW(), NOW()), 
            (3, 'Bebidas',NOW(), NOW());
        `);
    }

    public conn() {
        return this.connection;
    }
}

export default MysqlConnection