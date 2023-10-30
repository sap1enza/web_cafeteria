import Cliente from "./cliente";
import { statusPedido } from './enum/statusPedido';
import Produto from "./produto";

class Pedido {

  private _produtos: Produto[] = []; 
  private _status: statusPedido;
  private _valorTotal: number;

    constructor (
        readonly cliente: Cliente,
        status: statusPedido = statusPedido.CRIADO,
        readonly id? 
    ) {
      if (!cliente) {
        throw new Error("Cliente é obrigatório.");
      }
      this._status = status;
    }

    somaTotal(valorASomar: number): void {
      this._valorTotal += valorASomar;
  }
    adicionarProduto(produto: Produto): void {
      this._produtos.push(produto);
  }

    getProdutos = () => {
        return this._produtos;
    }

    setStatus = (status: statusPedido) => {
      this._status = status;
    }

    getStatus = () => {
      return this._status;
    }
    
}

export default Pedido;
