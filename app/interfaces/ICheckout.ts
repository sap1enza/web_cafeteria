import IRepository from "./IReporitory";

export default interface ICheckout extends IRepository {
    findByExternalReference(id: BigInteger)
}