class Category{
    
    public name: string = null;

    public id;

    constructor(name: string) {
        if (name == null || name == "") {
            throw new Error("O nome da categoria é obrigatório.")
        }
        this.name = name;
    }

}

export default Category;