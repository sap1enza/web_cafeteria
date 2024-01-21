import IRepository from "./IReporitory";

export default interface IClienteRepository extends IRepository {
    findByCPF(cpf: string);
}