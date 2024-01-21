import * as HttpStatus from 'http-status';
import ResponseAPI from "../../core/ResponseAPI"
import {Request, Response} from 'express';
import CategoriaRepository from '../../../gateways/CategoriaRepository';
import Categoria from '../../../domain/entity/categoria';
import { IDataBase } from "../../../interfaces/IDataBase";
import { CategoriaCasoDeUso } from '../../../cases/categoriaCasodeUso';



 class CategoriaController{

    /**
     * 
     */
    private _dbconnection: IDataBase;
    private repository: CategoriaRepository;

    /**
     * 
     */
    constructor(dbconnection: IDataBase) {
        this._dbconnection = dbconnection;
        this.repository = new CategoriaRepository(this._dbconnection);
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    public all = async (request: Request, response: Response) => {
        try {
            //let data = await this.repository.getAll(request.query);
            //const categoriaRepo = new CategoriaRepository( this._dbconnection );
            const data= await CategoriaCasoDeUso.getAllCategorias(request.query, this.repository)
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
            let categoria = new Categoria(request.body.name);
            try {
                let data = await CategoriaCasoDeUso.criarCategoria(categoria,this.repository);
                response.status(HttpStatus.OK).json(ResponseAPI.data(data));
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
            let categoria = new Categoria(request.body.name);
            try {
                let data = await CategoriaCasoDeUso.atualizarCategoria(categoria, request.params.id, this.repository);
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
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requerido."));
            }
            let data = await CategoriaCasoDeUso.encontrarCategoriaPorId(request.params.id,this.repository);
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
            if (typeof request.params.id == 'undefined') {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requerido."));
            }
            await CategoriaCasoDeUso.deleteCategoria(request.params.id,this.repository);
            response.status(HttpStatus.NO_CONTENT).json({});
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
    }
}

 export default CategoriaController;