import * as HttpStatus from 'http-status';
import ProductRepository from "../../repositories/ProductRepository";
import ResponseAPI from '../../core/ResponseAPI';
import MysqlDataBase from '../../database/MysqlDataBase';
import Product from '../../../domain/entity/product';
import Category from '../../../domain/entity/category';
import CategoriesRepository from '../../repositories/CategoriesRepository';


class ProductsController{
     /**
     * 
     */
     public repository: ProductRepository;
     public categoryRepository: CategoriesRepository;

     /**
      * 
      */
     constructor() {
         this.repository = new ProductRepository(new MysqlDataBase());
         this.categoryRepository = new CategoriesRepository(new MysqlDataBase());
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
             let category = await this.categoryRepository.findById(request.body.category_id);
             let product = new Product(
                 request.body.title,
                 request.body.value,
                 category,
                 request.body.description
             );
             
             try {
                 let data = await this.repository.store(product);
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
            let category = await this.categoryRepository.findById(request.body.category_id);
            
            let product = new Product(
                request.body.title,
                request.body.value,
                category,
                request.body.description
            );

             let data = await this.repository.update(product, request.params.id);
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

export default new ProductsController();