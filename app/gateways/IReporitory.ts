import IDataBase from "../application/database/IDataBase";
abstract class IRepository {
    constructor(readonly db: IDataBase) {}

    abstract getAll(params);
    abstract update(params, id);
    abstract store(params);
    abstract delete(id);
    abstract findById(id);

}

export default IRepository;