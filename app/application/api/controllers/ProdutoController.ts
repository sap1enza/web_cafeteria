import * as HttpStatus from 'http-status';
import ProdutoRepository from "../../repositories/ProdutoRepository";
import ResponseAPI from '../../core/ResponseAPI';
import MysqlDataBase from '../../database/MysqlDataBase';
import Produto from '../../../domain/entity/produto';
import Categoria from '../../../domain/entity/categoria';
import CategoriaRepository from '../../repositories/CategoriaRepository';


class ProdutoController{
     /**
     * 
     */
     public repository: ProdutoRepository;
     public categoryRepository: CategoriaRepository;

     /**
      * 
      */
     constructor() {
         this.repository = new ProdutoRepository(new MysqlDataBase());
         this.categoryRepository = new CategoriaRepository(new MysqlDataBase());
     }
 
     /**
      * 
      * @param request 
      * @param response 
      */
     public all = async (request, response) => {
         try {
             let data = await this.repository.getAll(request.query);
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
             let categoria = await this.categoryRepository.findById(request.body.category_id);
             let produto = new Produto(
                 request.body.title,
                 request.body.value,
                 categoria,
                 request.body.description
             );
             
             try {
                 let data = await this.repository.store(produto);
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
     public update = async (request, response) => {
         try {
            let categoria = await this.categoryRepository.findById(request.body.category_id);
            
            let produto = new Produto(
                request.body.title,
                request.body.value,
                categoria,
                request.body.description
            );

             let data = await this.repository.update(produto, request.params.id);
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
                 response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requido."));
             }
             let data = await this.repository.findById(request.params.id);
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
                 response.status(HttpStatus.BAD_REQUEST).json(ResponseAPI.inputError("id", "ID do registro é requido."));
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

export default new ProdutoController();