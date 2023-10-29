import Cliente from "./cliente";
import { statusPedido } from './enum/statusPedido';
import Produto from "./produto";

class Pedido {

    private status;

    private produtos = [];

    constructor (
        readonly cliente: Cliente,
        readonly id?
    ) {
      if (!cliente) {
        throw new Error("Cliente é obrigatório.");
      }
      this.status = statusPedido.CRIADO;
    }

    setProdutos = (produto: Produto) => {
        this.produtos.push(produto);
    }

    getProdutos = () => {
        return this.produtos;
    }

    setStatus = (status: statusPedido) => {
      this.status = status;
    }

    getStatus = () => {
      return this.status;
    }
}

export default Pedido;
