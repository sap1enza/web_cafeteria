import Customer from '../../domain/entity/customer.js';
import {StatusCodes} from "http-status-codes";
import ResponseAPI from '../../../core/responseApis.js';
import MariaDB from '../database/MariaDB.js';
import CustomerRepository from '../repository/CustomerRepository.js';

class CustomersController {

    /**
     * 
     * @param {*} request 
     * @param {*} response 
     */
    static store = async (request, response) => {
        try {
            let customer = new Customer(
                request.body.name,
                request.body.email,
                request.body.cpf_cnpj,
                request.body.birthday
            );
            let customerRepository = new CustomerRepository(new MariaDB());
            await customerRepository.store(customer);
            response.status(StatusCodes.OK).json(customer);
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
            let customer = new Customer(
                request.body.name,
                request.body.email,
                request.body.cpf_cnpj,
                request.body.birthday
            );
            let customerRepository = new CustomerRepository(new MariaDB());
            let data = await customerRepository.update(customer, request.params.id);
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
            let customerRepository = new CustomerRepository(new MariaDB());
            let data = await customerRepository.findById(request.params.id);
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
            let customerRepository = new CustomerRepository(new MariaDB());
            let data = await customerRepository.all(request.params);
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
            let customerRepository = new CustomerRepository(new MariaDB());
            let data = await customerRepository.delete(request.params.id);
            response.status(StatusCodes.NO_CONTENT).json({});
        } catch (err) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.internalError(err.message)
            );
        }
    }
}

export default CustomersController