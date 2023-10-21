import IDataBase from './IDataBase';
import MysqlConnection from '../core/mariadbConnection';

class MysqlDataBase extends IDataBase {

    db;

    constructor(){
        super();
        this.db = new MysqlConnection();
        console.log("MYSQL CONN")
    }

    async store(query: string, data: any) {
        return await this.db.conn().query(query, data);
    }
    async update(query: string, data: any) {
        return await this.db.conn().query(query, data);
    }
    async delete(query: string) {
        return await this.db.conn().query(query);
    }
    async find(query: string) {
        return await this.db.conn().query(query);
    }
}

export default MysqlDataBase;