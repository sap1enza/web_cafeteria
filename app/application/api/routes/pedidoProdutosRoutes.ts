import * as express from "express";
import PedidoController from "../controllers/PedidoController";
import PedidoProdutosController from "../controllers/PedidoProdutosController";

let router = express.Router();

router.get('/pedidos-produtos', PedidoProdutosController.all);
router.post('/pedidos-produtos', PedidoProdutosController.store);
router.get('/pedidos-produtos/:pedido_id', PedidoProdutosController.show);
router.put('/pedidos-produtos/:id', PedidoProdutosController.update);
router.delete('/pedidos-produtos/:id', PedidoProdutosController.delete);

export default router;
