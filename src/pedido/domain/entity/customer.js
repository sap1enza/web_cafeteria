class Customer{

    constructor (name, email, cpf_cnpj, birthday) {
        if (name == null) {
            throw new Error("Nome é um campo requirido.");
        }
        if (email == null) {
            throw new Error("E-mail é um campo requirido.");
        }
        if (cpf_cnpj == null) {
            throw new Error("CPF/CNPJ é um campo requirido.");
        }
        this.name = name;
        this.email = email;
        this.cpf_cnpj = cpf_cnpj;
        this.birthday = birthday;
    }


    isValidEmail () {
        return this.email != null;
    }

    isValidCpfCnpj () {
        return this.cpf_cnpj != null;
    }
}

export default Customer