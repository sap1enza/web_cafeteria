import Categoria from "./categoria";

class Produto{
    constructor (
        readonly title, 
        readonly value: number,
        readonly categoria: Categoria, 
        readonly description?,
        readonly id?
    ) {}

}

export default Produto;