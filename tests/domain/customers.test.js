import * as Customer from '../../app/domain/entity/customer';

test("MEU PRIMEIRO TESTE", () => {
    
    let customer = new Customer(
        "Bruno Blauzius Schuindt",
        "brunoblauzius@gmail.com",
        "043.065.619-09"
    );
    expect("Bruno Blauzius Schuindt").toBe(customer.name);
});