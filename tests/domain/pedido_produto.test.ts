import { describe } from 'node:test';
import { expect } from '@jest/globals';
import { test } from '@jest/globals';

import Cliente from '../../app/domain/entity/cliente';
import Produto from '../../app/domain/entity/produto';
import Pedido from '../../app/domain/entity/pedido';
import PedidoProduto from '../../app/domain/entity/pedido_produto';

describe("Validando PedidoProduto", () => {
    test("Cria PedidoProduto sem Pedido", () => {
      let dataProduto = new Produto(
        "Hamburguer",
        10,
        null,
        "Hamburguer com Queijo"
      );

      const dataPedidoProduto = () => {
        new PedidoProduto(
          null,
          dataProduto
        )
      };
      expect(dataPedidoProduto).toThrow(Error);
    })
    test("Cria PedidoProduto sem Produto", () => {
      let dataClient = new Cliente(
        "Heitor Bernardo Victor Nogueira",
        "heitoBVN@gmail.com",
        "043.065.619-09"
      );

      let dataPedido = new Pedido(
        dataClient,
        "created"
      );

      const dataPedidoProduto = () => {
        new PedidoProduto(
          dataPedido,
        null
        )
      };

      expect(dataPedidoProduto).toThrow(Error);
    })
    test("Cria PedidoProduto", () => {
      let dataClient = new Cliente(
        "Heitor Bernardo Victor Nogueira",
        "heitoBVN@gmail.com",
        "043.065.619-09"
      );

      let dataPedido = new Pedido(
        dataClient,
        "created"
      );

      let dataProduto = new Produto(
        "Hamburguer",
        10,
        null,
        "Hamburguer com Queijo"
      );

      let dataPedidoProduto = new PedidoProduto(
        dataPedido,
        dataProduto
      )

      expect(dataProduto).toEqual(dataPedidoProduto.produto);
      expect(dataPedido).toEqual(dataPedidoProduto.pedido);
    })
});
