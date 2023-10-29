import IDataBase from './IDataBase';
import MysqlConnection from '../core/mariadbConnection';

class MysqlDataBase extends IDataBase {

    db: MysqlConnection = null;

    constructor(){
        super();
        this.db = new MysqlConnection();
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
        console.log(query)
        return await this.db.conn().query(query);
    }
    async query(query: string) {
        console.log(query)
        return await this.db.conn().query(query)
    }
}

export default MysqlDataBase;