import * as express from "express";
import customeRoutes from './clienteRoutes';
import categoriesRoutes from './categoriaRoutes';
import productsRoutes from './produtoRoutes';

let router = express.Router();

router.use("/api/v1/", customeRoutes);
router.use("/api/v1/", categoriesRoutes);
router.use("/api/v1/", productsRoutes);

export default router;