import { UUID } from 'crypto';
import { describe } from 'node:test';
import { expect } from '@jest/globals';
import { test } from '@jest/globals';

import Payer from '../../app/domain/entity/payer';
import Cliente from '../../app/domain/entity/cliente';
import Cartao from '../../app/domain/entity/cartao';
import Pedido from '../../app/domain/entity/pedido';
import Checkout from '../../app/domain/entity/checkout';
import { statusPedido } from '../../app/domain/entity/enum/statusPedido';
import { StatusCheckout } from '../../app/domain/entity/enum/statusCheckout';

describe("Validando Entity Checkout", () => {
    test("Instanciar Checkout", () => {

        let instance = new Checkout(
            new Pedido(
                new Cliente(
                    "Heitor Bernardo Victor Nogueira",
                    "heitoBVN@gmail.com",
                    "043.065.619-09"
                  ),
                statusPedido.CRIADO
            ),
            new Cartao(
                new Payer(
                    "Heitor Bernardo Victor Nogueira",
                    "heitoBVN@gmail.com",
                    "317.594.877-40"
                ),
                '4171-9043-4466-6522',
                '155',
                '9/2026'
            )
        );
        /**
         * payer
         */
        expect("Heitor Bernardo Victor Nogueira").toEqual(instance.cartao.payer.name);
        expect("heitoBVN@gmail.com").toEqual(instance.cartao.payer.email);
        expect("31759487740").toEqual(instance.cartao.payer.document);
        /**
         * card
         */
        expect("4171-9043-4466-6522").toEqual(instance.cartao.number);
        expect("155").toEqual(instance.cartao.cvv);
        expect("9/2026").toEqual(instance.cartao.expirationDate);

        expect(statusPedido.CRIADO).toEqual(instance.pedido.getStatus());
        expect(StatusCheckout.AGUARDANDO_PAGAMENTO).toEqual(instance.getStatus());
        expect(instance.uuid).not.toBeNull();
    });
});