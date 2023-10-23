import {cpf} from 'cpf-cnpj-validator';

class Cliente{

    public id;

    constructor(
        readonly name?: string, 
        readonly email?: string, 
        readonly cpf_cnpj? : string
    ) {
        if (name==null || name=="") {
            throw new Error("Nome é obrigatório.");
        }
        if (email==null || email=="") {
            throw new Error("E-mail é obrigatório.");
        }
        if (!this.isValidEmail()) {
            throw new Error("E-mail inválido.");
        }
        if (cpf_cnpj==null || cpf_cnpj=="") {
            throw new Error("CPF é obrigatório.");
        }
        this.cpf_cnpj = String(cpf_cnpj).replace(".", "").replace("-", "").replace(".", "");

        if (!this.isValidCpf()) {
            throw new Error("CPF inválido.");
        }
    }

    public isValidCpf() : boolean {
        return cpf.isValid(this.cpf_cnpj);
    }

    public isValidEmail() : boolean {
        console.log(this.email);
    
        return !String(this.email)
        .toLocaleLowerCase()
        .match('^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
    }

    public cpfFormat() : string {
        return cpf.format(this.cpf_cnpj);
    }
}

export default Cliente;