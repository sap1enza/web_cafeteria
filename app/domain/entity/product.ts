import Category from "./category";

class Product{

    public id = null;

    constructor (
        readonly title, 
        readonly value,
        readonly category: Category, 
        readonly description?
    ) {}

}

export default Product;