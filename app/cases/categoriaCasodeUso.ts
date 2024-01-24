import IGateways from '../interfaces/IGateways';
export class CategoriaCasoDeUso{

    static async getAllCategorias(name, categoriaRepositorio: IGateways){
        const categorias = await categoriaRepositorio.getAll(name);
        return categorias;
    }

    static async criarCategoria(name, categoriaRepositorio: IGateways){
        const categorias = await categoriaRepositorio.store(name);
        return categorias;
    }
    static async atualizarCategoria(name, idCategoria, categoriaRepositorio: IGateways){
        const categorias = await categoriaRepositorio.update(name, idCategoria);
        return categorias;
    }
    static async encontrarCategoriaPorId(idCategoria, categoriaRepositorio: IGateways){
        const categorias = await categoriaRepositorio.findById(idCategoria);
        return categorias;
    }
    static async deleteCategoria(idCategoria, categoriaRepositorio: IGateways){
        const categorias = await categoriaRepositorio.delete(idCategoria);
        return categorias;
    }

}