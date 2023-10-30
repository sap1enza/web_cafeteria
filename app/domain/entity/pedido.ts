import Cliente from "./cliente";
import { statusPedido } from './enum/statusPedido';
import Produto from "./produto";

class Pedido {

  private _produtos: Produto[] = []; 

  private _status: statusPedido;

  private _valorTotal: number = 0;

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

    somaTotal(valor: number): void {
      this._valorTotal += valor;
    }

    getValorTotal() : number {
      return this._valorTotal;
    }

    adicionarProduto(produto: Produto): void {
        this._produtos.push(produto);
        this.somaTotal(produto.value);
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
