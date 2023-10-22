import Category from "./category";

class Product{
    constructor (
        readonly title, 
        readonly value,
        readonly category: Category, 
        readonly description?,
        readonly id?
    ) {}

}

export default Product;