import express from "express";
import PedidosController from "../cases/PedidosController.js";

const router = express.Router();

router.get("/pedidos", PedidosController.listarPedidos);
router.post("/pedidos", PedidosController.criarPedido);
router.get("/pedidos/:id", PedidosController.buscarPedidoPorId);
router.delete("/pedidos/:id", PedidosController.deletarPedido);
router.put("/pedidos/:id", PedidosController.atualizaPedido);

export default router;
