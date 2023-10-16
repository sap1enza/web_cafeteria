import mariaDB from '../../../config/mariaDBConnect.js';

class MariaDB
{
    async store(query, data) {
       return await mariaDB.query(query, data);
    }

    async update(query, data) {
        return await mariaDB.query(query, data);
    }

    async query(query) {
        return await mariaDB.query(query);
    }

    async delete(query) {
        return await mariaDB.query(query);
    }
}

export default MariaDB;