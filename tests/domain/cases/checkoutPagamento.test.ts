import { describe } from 'node:test';
import { expect } from '@jest/globals';
import { test, it, beforeAll, afterAll, jest } from '@jest/globals';
import CheckoutPagamento from '../../../app/cases/checkoutPagamento';
import CheckoutPagamentoRepository from '../../../app/gateways/CheckoutPagamentoRepository';
import MysqlDataBase from '../../../app/application/database/MysqlDataBase';
import MPagamento from '../../../app/gateways/paymentsMethods/MercadoPago/MPagamento';
import PedidoRepository from '../../../app/gateways/PedidoRepository';
import Checkout from '../../../app/domain/entity/checkout';
import Cartao from '../../../app/domain/entity/cartao';
import Payer from '../../../app/domain/entity/payer';
import PaymentoMethods from '../../../app/gateways/paymentsMethods/PaymentoMethods';


describe("TEST use case Checkout Pagamento.", () =>{
    test("Teste de Confirmação de pagamento PIX" , async () => {
        let mysqlDB = new MysqlDataBase();
        // let pedidoRepository = new PedidoRepository(mysqlDB);
        // let pedido = await pedidoRepository.findById(new Uint8Array(1));
        // expect(pedido).not.toBeNull()
        // let checkout = new Checkout(
        //    pedido,
        //     new Cartao(
        //         new Payer(
        //             "Heitor Bernardo Victor Nogueira",
        //             "heitoBVN@gmail.com",
        //             "317.594.877-40"
        //         ),
        //         null,
        //         null,
        //         null
        //     )
        // );
        // checkout.setPaymentMethod(PaymentoMethods.PIX)
    
        // let checkoutPagamento = new CheckoutPagamento(
        //     checkout,
        //     new CheckoutPagamentoRepository(mysqlDB),
        //     new MPagamento()
        // );
    
    });
});


