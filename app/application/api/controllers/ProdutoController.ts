import * as HttpStatus from 'http-status';
import ProdutoRepository from "../../../gateways/ProdutoRepository";
import ResponseAPI from '../../../adapters/ResponseAPI';
import Produto from '../../../domain/entity/produto';
import Categoria from '../../../domain/entity/categoria';
import CategoriaRepository from '../../../gateways/CategoriaRepository';
import { IDataBase } from '../../../interfaces/IDataBase';
import { ProdutoCasoDeUso } from '../../../cases/produtoCasodeUso';


class ProdutoController{
     /**
     * 
     */
     public repository: ProdutoRepository;
     private _dbconnection: IDataBase;
     public categoryRepository: CategoriaRepository;

     /**
      * 
      */
     constructor(dbconnection: IDataBase) {
        this._dbconnection = dbconnection;
         this.repository = new ProdutoRepository(dbconnection);
         this.categoryRepository = new CategoriaRepository(dbconnection);
     }
 
     /**
      * 
      * @param request 
      * @param response 
      */
     public all = async (request, response) => {
         try {
             let data = await ProdutoCasoDeUso.getAllProdutos(request.query,this.repository);
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
                const data = await ProdutoCasoDeUso.criarProduto(request,this.categoryRepository,this.repository);
                response.status(HttpStatus.OK).json(ResponseAPI.data(data));

            } catch(err) {
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
            const data = await ProdutoCasoDeUso.atualizarProduto(request,this.categoryRepository,this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));

        } catch(err) {
            response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.error(err.message));
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
             let data = await ProdutoCasoDeUso.encontrarProdutoPorId(request.params.id,this.repository);
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
             if (typeof request.params.id == 'undefined') {
                 response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requerido."));
             }
             let data = await ProdutoCasoDeUso.deleteProduto(request.params.id, this.repository);
             response.status(HttpStatus.NO_CONTENT).json({});
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
     public getByidCategory = async (request, response) => {
        try {
            if (typeof request.params.category_id  == 'undefined' || request.params.category_id == "") {
                response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID da Categoria é requerido."));
            }
            let data = await ProdutoCasoDeUso.findByCategory(request.params.category_id, this.repository);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
}
}

export default ProdutoController;