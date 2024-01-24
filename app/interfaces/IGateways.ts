import {IDataBase} from "./IDataBase";
abstract class IGateways {
    constructor(readonly db: IDataBase) {}

    abstract getAll(params);
    abstract update(params, id);
    abstract store(params);
    abstract delete(id);
    abstract findById(id);

}

export default IGateways;