import { describe } from 'node:test';
import { expect } from '@jest/globals';
import { test, it } from '@jest/globals';
import MPagamento from '../../../../../app/application/core/paymentsMethods/MercadoPago/MPagamento';

describe("MP metodo de pagamento PIX", () => {
    test("Autenticação de usuário", async () => {
        let mercado_pago = new MPagamento();
        console.log(mercado_pago.auth_token)
        expect(mercado_pago.auth_token).not.toBeNull();
    });
});