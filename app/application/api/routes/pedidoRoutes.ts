import * as express from "express";
import PedidoController from "../controllers/PedidoController";

let router = express.Router();

router.get('/pedidos', PedidoController.all);
router.post('/pedidos', PedidoController.store);
router.get('/pedidos/:id', PedidoController.show);
router.put('/pedidos/update/:id', PedidoController.update);
router.delete('/pedidos/:id', PedidoController.delete);

export default router;
