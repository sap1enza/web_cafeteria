import IGateways from "./IGateways";

export default interface ICliente extends IGateways {
    findByCPF(cpf: string);
}