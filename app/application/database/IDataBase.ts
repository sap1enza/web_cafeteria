abstract class IDataBase {
    public connection = null;

    abstract store(query: string, data);
    abstract update(query: string, data);
    abstract delete(query: string);
    abstract find(query: string);
    abstract query(query: string);

}

export default IDataBase;