import Clients from '../../domain/entity/clients.js';
import {StatusCodes} from "http-status-codes";
import ResponseAPI from '../../../core/responseApis.js';
import MariaDB from '../database/MariaDB.js';
import ClientRepository from '../repository/ClientRepository.js';

class ClientsController {

    /**
     * 
     * @param {*} request 
     * @param {*} response 
     */
    static store = async (request, response) => {
        try {
            let client = new Clients(
                request.body.name,
                request.body.email,
                request.body.cpf_cnpj,
                request.body.birthday
            );
            let clientRepository = new ClientRepository(new MariaDB());
            await clientRepository.store(client);
            response.status(StatusCodes.OK).json(client);
        } catch (err) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.internalError(err.message)
            );
        }
    }

    /**
     * 
     * @param {*} request 
     * @param {*} response 
     */
    static update = async (request, response) => {
        try {
            let client = new Clients(
                request.body.name,
                request.body.email,
                request.body.cpf_cnpj,
                request.body.birthday
            );
            let clientRepository = new ClientRepository(new MariaDB());
            let data = await clientRepository.update(client, request.params.id);
            response.status(StatusCodes.OK).json(ResponseAPI.data(data));
        } catch (err) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.internalError(err.message)
            );
        }
    }

    /**
     * 
     * @param {*} request 
     * @param {*} response 
     */
    static findById = async (request, response) => {
        try {
            let clientRepository = new ClientRepository(new MariaDB());
            let data = await clientRepository.findById(request.params.id);
            response.status(StatusCodes.OK).json(ResponseAPI.data(data));
        } catch (err) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.internalError(err.message)
            );
        }
    }

    /**
     * 
     * @param {*} request 
     * @param {*} response 
     */
    static all = async (request, response) => {
        try {
            let clientRepository = new ClientRepository(new MariaDB());
            let data = await clientRepository.all(request.params);
            response.status(StatusCodes.OK).json(ResponseAPI.list(data));
        } catch (err) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.internalError(err.message)
            );
        }
    }

    /**
     * 
     * @param {*} request 
     * @param {*} response 
     */
    static delete = async (request, response) => {
        try {
            let clientRepository = new ClientRepository(new MariaDB());
            let data = await clientRepository.delete(request.params.id);
            response.status(StatusCodes.NO_CONTENT).json({});
        } catch (err) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.internalError(err.message)
            );
        }
    }
}

export default ClientsController