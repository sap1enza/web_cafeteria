import * as express from "express";
import customerRoutes from './clienteRoutes';
import categoriesRoutes from './categoriaRoutes';
import productsRoutes from './produtoRoutes';
import orderRoutes from './pedidoRoutes';
import checkoutRoutes from './checkoutRoutes';

let router = express.Router();

router.use("/api/v1/", customerRoutes);
router.use("/api/v1/", categoriesRoutes);
router.use("/api/v1/", productsRoutes);
router.use("/api/v1/", orderRoutes);
router.use("/api/v1/", checkoutRoutes);

export default router;
