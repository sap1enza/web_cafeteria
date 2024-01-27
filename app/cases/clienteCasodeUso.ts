import BadRequestError from '../application/exception/BadRequestError';
import Cliente from '../entity/cliente';
import ICliente from '../interfaces/ICliente';
export class ClienteCasoDeUso{

    static async getAllClientes(request, clienteRepositorio: ICliente){
        const clientes = await clienteRepositorio.getAll(request);
        return clientes;
    }

    static async criarCliente(cliente : Cliente, clienteRepositorio: ICliente) {
        let cpf_cnpj = await clienteRepositorio.findByCPF(cliente.cpf_cnpj);
        let email = await clienteRepositorio.findByEmail(cliente.email);
        if (email != null) {
            throw new BadRequestError("E-mail já cadastrado.");
        } else if (cpf_cnpj != null) {
            throw new BadRequestError("CPF ou CNPJ já cadastrado.");
        }
        return await clienteRepositorio.store(cliente);
    }

    static async atualizarCliente(cliente: Cliente, idCliente, clienteRepositorio: ICliente) {
        let dataCliente = await clienteRepositorio.findById(idCliente);

        if (dataCliente == null) {
            throw new BadRequestError("Cliente não encontrado.");
        }

        if (dataCliente['cpf_cnpj'] != cliente.cpf_cnpj) {
            let cpf_cnpj = await clienteRepositorio.findByCPF(cliente.cpf_cnpj);
            if (cpf_cnpj) {
                throw new BadRequestError("CPF ou CNPJ já cadastrado.");
            }
        }

        if (dataCliente['email'].toLocaleLowerCase() != cliente.email.toLocaleLowerCase()) {
            let email = await clienteRepositorio.findByEmail(cliente.email);
            if (email) {
                throw new BadRequestError("E-mail já cadastrado.");
            }
        }

        cliente = await clienteRepositorio.update(cliente, idCliente);
        return cliente;
    }
    static async encontrarClientePorId(idCliente, clienteRepositorio: ICliente){
        const cliente = await clienteRepositorio.findById(idCliente);
        return cliente;
    }

    static async encontrarClientePorCPF(idCliente, clienteRepositorio: ICliente){
        const cliente = await clienteRepositorio.findByCPF(idCliente);
        return cliente;
    }
    static async deleteCliente(idCliente, clienteRepositorio: ICliente){
        const cliente = await clienteRepositorio.delete(idCliente);
        return cliente;
    }

}