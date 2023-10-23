class Categoria{
    
    public name: string = null;

    constructor(name?: string, readonly id?) {
        if (name == null || name == "") {
            throw new Error("O nome da categoria é obrigatório.")
        }
        this.name = name;
        this.id = id;
    }

}

export default Categoria;