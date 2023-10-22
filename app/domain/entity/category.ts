class Category{
    
    public name: string = null;

    constructor(name: string, readonly id?: BigInteger) {
        if (name == null || name == "") {
            throw new Error("O nome da categoria é obrigatório.")
        }
        this.name = name;
        this.id = id;
    }

}

export default Category;