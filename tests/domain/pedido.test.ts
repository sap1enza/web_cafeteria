import { describe } from 'node:test';
import { expect } from '@jest/globals';
import { test } from '@jest/globals';

import Cliente from '../../app/domain/entity/cliente';
import Pedido from '../../app/domain/entity/pedido';
import { statusPedido } from '../../app/domain/entity/enum/statusPedido';

describe("Validando Pedido", () => {
    test("Cria Pedido sem Cliente", () => {
      const dataPedido = () => {
        new Pedido(
          null,
          statusPedido.CRIADO
        );
      };
      expect(dataPedido).toThrow(Error);
    })

    test("Cria Pedido com Cliente", () => {
        let dataClient = new Cliente(
          "Heitor Bernardo Victor Nogueira",
          "heitoBVN@gmail.com",
          "043.065.619-09"
        );

        let dataPedido = new Pedido(
          dataClient,
          statusPedido.CRIADO
        );
        expect("Heitor Bernardo Victor Nogueira").toEqual(dataPedido.cliente.name);
        expect(0).toEqual(dataPedido.getStatus());
    })
});
