import pedido from '../../domain/entity/pedido.js';
import {StatusCodes} from "http-status-codes";
import ResponseAPI from '../../../core/responseApis.js';

class PedidosController {

    static listarPedidos = async (request, response) => {
        try {
            const item = await pedido.find({});
            response.status(StatusCodes.OK)
            .json(ResponseAPI.list(item));
        } catch (err) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(
                ResponseAPI.internalError(err.message)
            );
        }
    }

    static buscarPedidoPorId = async (request , response) => {
        const item = await pedido.findById(request.params.id);
        response.status(StatusCodes.OK)
        .json(item);
    }

    static criarPedido = (request, response) => {
        let data = new pedido(request.body);
        data.save().then((result) => {
            response.status(StatusCodes.CREATED).json(
                ResponseAPI.success("Registro criado com sucesso.")
            );
        })
        .catch((err) => {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                    ResponseAPI.internalError(err.message)
                );
        })
    }

    static atualizaPedido = async (request , response) => {
        const item = await pedido.findById(request.params.id);
        response.status(StatusCodes.OK).json(
            ResponseAPI.success("Registro atualizado com sucesso.")
        );
    }

    static deletarPedido = async (request , response) => {
        const item = await pedido.findByIdAndDelete(request.params.id);
        response.status(StatusCodes.NO_CONTENT)
        .json(
            ResponseAPI.success("Registro excluido com sucesso.")
        );
    }
}

export default PedidosController