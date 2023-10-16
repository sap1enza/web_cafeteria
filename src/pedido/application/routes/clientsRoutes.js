import express from "express";
import ClientsController from "../cases/ClientsController.js";

const router = express.Router();

router.post("/clients", ClientsController.store);
router.get("/clients/:id", ClientsController.findById);
router.put("/clients/:id", ClientsController.update);
router.delete("/clients/:id", ClientsController.delete);
router.get("/clients", ClientsController.all);
// router.post("/pedidos", PedidosController.criarPedido);
// router.get("/pedidos/:id", PedidosController.buscarPedidoPorId);
// router.delete("/pedidos/:id", PedidosController.deletarPedido);
// router.put("/pedidos/:id", PedidosController.atualizaPedido);

export default router;