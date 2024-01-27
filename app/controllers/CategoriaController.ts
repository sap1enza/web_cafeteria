import * as HttpStatus from 'http-status';
import ResponseAPI from "../adapters/ResponseAPI"
import {Request, Response} from 'express';
import CategoriaRepository from '../gateways/CategoriaRepository';
import Categoria from '../entity/categoria';
import { IDataBase } from "../interfaces/IDataBase";
import { CategoriaCasoDeUso } from '../cases/categoriaCasodeUso';
import BadRequestError from '../application/exception/BadRequestError';



 class CategoriaController{

    /**
     * 
     */
    private repository: CategoriaRepository;

    /**
     * 
     */
    constructor(dbconnection: IDataBase) {
        this.repository = new CategoriaRepository(dbconnection);
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public all = async (request: Request, response: Response) => {
        try {
            const data= await CategoriaCasoDeUso.getAllCategorias(request.query, this.repository)
            response.status(HttpStatus.OK).json(ResponseAPI.list(data));
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
    public store = async (request: Request, response: Response) => {
        try {
            let categoria = new Categoria(request.body.name);
            let data = await CategoriaCasoDeUso.criarCategoria(categoria, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
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
    public update = async (request: Request, response: Response) => {
        try {
            let categoria = new Categoria(request.body.name);
            let data = await CategoriaCasoDeUso.atualizarCategoria(categoria, request.params.id, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.list(data));
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
    public show = async (request: Request, response: Response) => {
        try {
            if (typeof request.params.id == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requerido."));
            }
            let data = await CategoriaCasoDeUso.encontrarCategoriaPorId(request.params.id,this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
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
    public delete = async (request: Request, response: Response) => {
        try {
            if (typeof request.params.id == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requerido."));
            }
            await CategoriaCasoDeUso.deleteCategoria(request.params.id,this.repository);
            response.status(HttpStatus.NO_CONTENT).json({});
        } catch (err) {
            if (err instanceof BadRequestError) {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message));
            } else if (err instanceof Error) {
                response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(ResponseAPI.error(err.message)); 
            }
        }
    }
}

 export default CategoriaController;