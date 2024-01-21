import CategoriaRepository from '../gateways/CategoriaRepository';
import IRepository from '../interfaces/IReporitory';
export class CategoriaCasoDeUso{

    static async getAllCategorias(name, categoriaRepositorio: IRepository){
        const categorias = await categoriaRepositorio.getAll(name);
        return categorias;
    }

}