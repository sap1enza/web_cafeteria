import * as cliente from '../../app/domain/entity/cliente';

test("MEU PRIMEIRO TESTE", () => {
    
    let cliente = new cliente(
        "Bruno Blauzius Schuindt",
        "brunoblauzius@gmail.com",
        "043.065.619-09"
    );
    expect("Bruno Blauzius Schuindt").toBe(cliente.name);
});