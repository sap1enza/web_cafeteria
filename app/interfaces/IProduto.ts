
import IRepository from "./IReporitory";

export default interface IProduto extends IRepository {
    findByMultipleIds(ids: number[]);
    findByCategory(category_id: BigInteger);
}