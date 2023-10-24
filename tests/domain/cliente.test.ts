import { describe } from 'node:test';
import { expect } from '@jest/globals';
import { test } from '@jest/globals';

import cliente from '../../app/domain/entity/cliente';

describe("Validando Cliente", () => {
    test("Inserir Cliente", () => {
        let dataClient = new cliente(
            "Heitor Bernardo Victor Nogueira",
            "heitoBVN@gmail.com",
            "043.065.619-09"
        );
        expect("Heitor Bernardo Victor Nogueira").toEqual(dataClient.name);
        expect("heitoBVN@gmail.com").toEqual(dataClient.email);
        expect("04306561909").toEqual(dataClient.cpf_cnpj);
    })
    test("CPF sem formatação", () => {
        let dataClient = new cliente(
            "Heitor Bernardo Victor Nogueira",
            "heitoBVN@gmail.com",
            "317.594.877-40"
        );
        expect("Heitor Bernardo Victor Nogueira").toEqual(dataClient.name);
        expect("heitoBVN@gmail.com").toEqual(dataClient.email);
        expect("317.594.877-40").not.toEqual(dataClient.cpf_cnpj);
    })
});