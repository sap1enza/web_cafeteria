import Produto from '../domain/entity/produto';
import IClienteRepository from '../interfaces/ICliente';
import IProduto from '../interfaces/IProduto';
import IRepository from '../interfaces/IReporitory';
import CategoriaRepository from '../gateways/CategoriaRepository';

export class ProdutoCasoDeUso{

    static async getAllProdutos(request, ProdutoRepositorio: IProduto){
        const Produtos = await ProdutoRepositorio.getAll(request);
        return Produtos;
    }

    static async criarProduto(request,CategoriaRepository: IRepository, ProdutoRepositorio: IProduto){
        let categoria = await CategoriaRepository.findById(request.body.category_id);
             let produto = new Produto(
                 request.body.title,
                 request.body.value,
                 categoria,
                 request.body.description
             );
             
             try {
                 let data = await ProdutoRepositorio.store(produto);
                 return data;
             } catch(err) {
                throw new Error(err.message)
             }
    }
    static async atualizarProduto(request,CategoriaRepository: IRepository, ProdutoRepositorio: IProduto){
        try {
            let categoria = await CategoriaRepository.findById(request.body.category_id);
            
            let produto = new Produto(
                request.body.title,
                request.body.value,
                categoria,
                request.body.description
            );

             let data = await ProdutoRepositorio.update(produto, request.params.id);
             return data;
         } catch (err) { throw new Error(err.message)}

    }
    static async encontrarProdutoPorId(idProduto, ProdutoRepositorio: IProduto){
        const Produto = await ProdutoRepositorio.findById(idProduto);
        return Produto;
    }

    static async deleteProduto(idProduto, ProdutoRepositorio: IProduto){
                const Produto = await ProdutoRepositorio.delete(idProduto);
        return Produto;
    }

    static async findByCategory(idProduto, ProdutoRepositorio: IProduto){
        const Produto = await ProdutoRepositorio.findByCategory(idProduto);
    return Produto;
}

}