import * as HttpStatus from 'http-status';
import ProdutoGateway from '../gateways/ProdutoGateway';
import CategoriaRepository from '../gateways/CategoriaRepository';
import MysqlDataBase from '../application/database/MysqlDataBase';
import ResponseAPI from '../application/core/ResponseAPI';
import Produto from '../domain/entity/produto';


class ProdutoController{
     /**
     * 
     */
     public gateway: ProdutoGateway;
     public categoryRepository: CategoriaRepository;

     /**
      * 
      */
     constructor() {
         this.gateway = new ProdutoGateway(new MysqlDataBase());
         this.categoryRepository = new CategoriaRepository(new MysqlDataBase());
     }
 
     /**
      * 
      * @param request 
      * @param response 
      */
     public all = async (request, response) => {
         try {
             let data = await this.gateway.getAll(request.query);
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
                 let data = await this.gateway.store(produto);
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

             let data = await this.gateway.update(produto, request.params.id);
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
             let data = await this.gateway.findById(request.params.id);
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
             let data = await this.gateway.delete(request.params.id);
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
            let data = await this.gateway.findByCategory(request.params.category_id);
            response.status(HttpStatus.OK).json(ResponseAPI.data(data));
        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.error(err.message)
            );
        }
}
}

export default new ProdutoController();