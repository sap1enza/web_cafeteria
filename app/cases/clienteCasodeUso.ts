import ICliente from '../interfaces/ICliente';
export class ClienteCasoDeUso{

    static async getAllClientes(request, clienteRepositorio: ICliente){
        const clientes = await clienteRepositorio.getAll(request);
        return clientes;
    }

    static async criarCliente(request, clienteRepositorio: ICliente){
        const cliente = await clienteRepositorio.store(request);
        return cliente;
    }
    static async atualizarCliente(request, idCliente, clienteRepositorio: ICliente){
        const cliente = await clienteRepositorio.update(request, idCliente);
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