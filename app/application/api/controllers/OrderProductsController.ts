import * as HttpStatus from 'http-status';
import OrderProductsRepository from "../../repositories/OrderProductsRepository";
import OrderRepository from "../../repositories/OrderRepository";
import ProductRepository from "../../repositories/ProductRepository";
import ResponseAPI from '../../core/ResponseAPI';
import MysqlDataBase from '../../database/MysqlDataBase';
import OrderProduct from '../../../domain/entity/order_product';



// id INT PRIMARY KEY AUTO_INCREMENT,
// order_id INT not null,
// product_id INT not null,
// created datetime null,
// modified datetime null

// return new OrderProduct(
//   order_product.order,
//   order_product.product,
//   id
// );

class OrderProductsController {
    /**
     *
     */
    public repository: OrderProductsRepository;
    public orderRepository: OrderRepository;
    public productRepository: ProductRepository;

    /**
     *
     */
    constructor() {
        this.repository = new OrderProductsRepository(new MysqlDataBase());
        this.orderRepository = new OrderRepository(new MysqlDataBase());
        this.productRepository = new ProductRepository(new MysqlDataBase());
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
            let order = await this.orderRepository.findById(request.body.order_id);
            let product = await this.productRepository.findById(request.body.product_id);

            let order_product = new OrderProduct(
                order,
                product
            );

            try {
                let data = await this.repository.store(order_product);
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
            let order = await this.orderRepository.findById(request.body.order_id);
            let product = await this.productRepository.findById(request.body.product_id);

            let order_product = new OrderProduct(
              order,
              product
            );

            let data = await this.repository.update(order_product, request.params.id);
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

export default new OrderProductsController();