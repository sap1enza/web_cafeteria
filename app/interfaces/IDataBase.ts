export interface IDataBase {
    //public connection = null;

    store(query, string, data?: any);
    update(query: string, data?: any);
    delete(query: string);
    find(query: string);
    query(query: string);

}

//export default IDataBase;