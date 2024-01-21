import {IDataBase} from '../interfaces/IDataBase';
import MysqlConnection from './mariadbConnection';

export class MysqlDataBase implements IDataBase {

    private db: MysqlConnection;

    constructor(){
        //super();
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
        return await this.db.conn().query(query);
    }
    async query(query: string) {
        return await this.db.conn().query(query)
    }
}

export default MysqlDataBase;