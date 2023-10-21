import {cpf} from 'cpf-cnpj-validator';

class Customer{

    public id;

    constructor(
        readonly name?: string, 
        readonly email?: string, 
        readonly cpf_cnpj? : string
    ) {}

    public isValidCpf() : boolean {
        return cpf.isValid(this.cpf_cnpj);
    }

    public isValidEmail() : boolean {
        return !String(this.email)
        .toLocaleLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

    public cpfFormat() : string {
        return cpf.format(this.cpf_cnpj);
    }
}

export default Customer;