import * as HttpStatus from 'http-status';
import ClienteRepository from "../gateways/ClienteRepository";
import ResponseAPI from '../adapters/ResponseAPI';
import Cliente from '../entity/cliente';
import { IDataBase } from "../interfaces/IDataBase";
import { ClienteCasoDeUso } from '../cases/clienteCasodeUso';
import BadRequestError from '../application/exception/BadRequestError';
class ClienteController{

    private repository: ClienteRepository;

    /**
     * 
     */
    constructor(dbconnection: IDataBase) {
        this.repository = new ClienteRepository(dbconnection);
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public all = async (request, response) => {
        try {

            let cliente = await ClienteCasoDeUso.getAllClientes(request.query,this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.list(cliente));

        } catch(err) {
            if (err instanceof BadRequestError) {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message));
            } else if (err instanceof Error) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseAPI.error(err.message)); 
            } 
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public store = async (request, response) => {
        try {
            
            let cliente = new Cliente(
                request.body.name,
                request.body.email,
                request.body.cpf_cnpj
            );
            
            cliente = await ClienteCasoDeUso.criarCliente(cliente, this.repository);
            response.status(HttpStatus.OK).json(cliente);

        } catch (err) {
            if (err instanceof BadRequestError) {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message));
            } else if (err instanceof Error) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseAPI.error(err.message)); 
            } 
        } 
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public update = async (request, response) => {
        try {

            let cliente = new Cliente(
                request.body.name,
                request.body.email,
                request.body.cpf_cnpj,
            );

            cliente = await ClienteCasoDeUso.atualizarCliente(cliente, request.params.id,this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(cliente));

        } catch (err) {
            if (err instanceof BadRequestError) {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message));
            } else if (err instanceof Error) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseAPI.error(err.message)); 
            } 
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public show = async (request, response) => {
        try {

            if (typeof request.params.id == 'undefined' || request.params.id == "") {
                throw new BadRequestError("ID do registro é requerido.");
            }

            let cliente = await ClienteCasoDeUso.encontrarClientePorId(request.params.id, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(cliente));

        } catch (err) {
            if (err instanceof BadRequestError) {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message));
            } else if (err instanceof Error) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseAPI.error(err.message)); 
            } 
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public identifyByCPF = async (request, response) => {
        try {

            if (typeof request.params.cpfcnpj == 'undefined' || request.params.cpfcnpj == "") {
                throw new BadRequestError("CPF do registro é requerido.");
            }

            let cliente = await this.repository.findByCPF(request.params.cpfcnpj);
            response.status(HttpStatus.OK).json(ResponseAPI.data(cliente));

        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public delete = async (request, response) => {
        try {
            if (typeof request.params.id == 'undefined' || request.params.id == "") {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requerido."));
            }
            let data = await this.repository.delete(request.params.id);
            response.status(HttpStatus.NO_CONTENT).json({});
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
    }
}

export default ClienteController;