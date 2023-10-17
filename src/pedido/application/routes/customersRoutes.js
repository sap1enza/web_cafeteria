import express from "express";
import CustomerController from "../cases/CustomerController.js";

const router = express.Router();

router.post("/customers", CustomerController.store);
router.get("/customers/:id", CustomerController.findById);
router.put("/customers/:id", CustomerController.update);
router.delete("/customers/:id", CustomerController.delete);
router.get("/customers", CustomerController.all);
// router.post("/pedidos", PedidosController.criarPedido);
// router.get("/pedidos/:id", PedidosController.buscarPedidoPorId);
// router.delete("/pedidos/:id", PedidosController.deletarPedido);
// router.put("/pedidos/:id", PedidosController.atualizaPedido);

export default router;