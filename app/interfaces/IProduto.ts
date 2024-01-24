
import IGateways from "./IGateways";

export default interface IProduto extends IGateways {
    findByMultipleIds(ids: number[]);
    findByCategory(category_id: BigInteger);
}