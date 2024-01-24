import * as HttpStatus from 'http-status';
import ClienteRepository from "../gateways/ClienteRepository";
import ResponseAPI from '../adapters/ResponseAPI';
import Cliente from '../entity/cliente';
import { IDataBase } from "../interfaces/IDataBase";
import { ClienteCasoDeUso } from '../cases/clienteCasodeUso';
class ClienteController{

    /**
     * 
     */
    private _dbconnection: IDataBase;
    private repository: ClienteRepository;

    /**
     * 
     */
    constructor(dbconnection: IDataBase) {
        this._dbconnection = dbconnection;
        this.repository = new ClienteRepository(this._dbconnection);
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public all = async (request, response) => {
        try {
            let data = await ClienteCasoDeUso.getAllClientes(request.query,this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.list(data));
        } catch(err) {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message)); 
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
            
            try {
                let data = await ClienteCasoDeUso.criarCliente(cliente,this.repository);
                response.status(HttpStatus.OK).json({message:'Cliente criado com sucesso!'});
                
            } catch(err) {
                    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseAPI.error(err.message)); 
            }
        } catch (err) {
            response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message)); 
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
            let data = await ClienteCasoDeUso.atualizarCliente(cliente, request.params.id,this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
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
    public show = async (request, response) => {
        try {
            if (typeof request.params.id == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requerido."));
            }
            let data = await ClienteCasoDeUso.encontrarClientePorId(request.params.id,this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
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
    public identifyByCPF = async (request, response) => {
        try {
            if (typeof request.params.cpfcnpj == 'undefined' || request.params.cpfcnpj == "") {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "CPF do registro é requerido."));
            }
            let data = await this.repository.findByCPF(request.params.cpfcnpj);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
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