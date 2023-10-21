import * as HttpStatus from 'http-status';
import ResponseAPI from "../../core/ResponseAPI"
import {Request, Response} from 'express';
import CategoriesRepository from '../../repositories/CategoriesRepository';
import MysqlDataBase from '../../database/MysqlDataBase';
import Category from '../../../domain/entity/category';



class CategoriesController{

    /**
     * 
     */
    public repository: CategoriesRepository;

    /**
     * 
     */
    constructor() {
        this.repository = new CategoriesRepository(new MysqlDataBase());
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public all = async (request: Request, response: Response) => {
        try {
            let data = await this.repository.getAll(request.query);
            response.status(HttpStatus.OK).json(ResponseAPI.list(data));
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(ResponseAPI.error(err.message));
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public store = async (request: Request, response: Response) => {
        try {
            let category = new Category(request.params.name);
            
            try {
                let data = await this.repository.store(category);
                response.status(HttpStatus.OK).json(ResponseAPI.list(data));
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
    public update = async (request: Request, response: Response) => {
        try {
            let category = new Category(request.params.name);
            
            try {
                let data = await this.repository.update(category, request.params.id);
                response.status(HttpStatus.OK).json(ResponseAPI.list(data));
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
    public show = async (request: Request, response: Response) => {
        try {
            if (typeof request.params.id == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requido."));
            }
            let data = await this.repository.findById(request.params.id);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(ResponseAPI.error(err.message));
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public delete = async (request: Request, response: Response) => {
        try {
            if (typeof request.params.cpfcnpj == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requido."));
            }
            await this.repository.delete(request.params.id);
            response.status(HttpStatus.NO_CONTENT).json({});
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
    }
}

export default new CategoriesController();