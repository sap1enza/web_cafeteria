import mariadb from "mariadb";

let db;
        
try {

    db = await mariadb.createConnection({
            host: process.env.MARIADB_HOST,
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASS,
            database: process.env.MARIADB_DATABASE,
            port : process.env.MARIADB_PORT,
        });
    console.log("SUCCESS:", `Conexão estabelecida host: ${process.env.MARIADB_HOST}:${process.env.MARIADB_PORT}`);

    await db.query(`
        CREATE TABLE IF NOT EXISTS customers (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(200) not null,
            email VARCHAR(245) not null unique,
            cpf_cnpj VARCHAR(20) not null unique,
            birthday date not null,
            created datetime null,
            modified datetime null
        )  ENGINE=INNODB;
    `);
} catch (err) {
    console.error(err);
}

export default db;