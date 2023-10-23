import * as express from "express";
import customerRoutes from './customersRoutes';
import categoriesRoutes from './categoriesRoutes';
import productsRoutes from './productsRoutes';
import orderRoutes from './orderRoutes';
import orderProductsRoutes from './orderProductsRoutes';

let router = express.Router();

router.use("/api/v1/", customerRoutes);
router.use("/api/v1/", categoriesRoutes);
router.use("/api/v1/", productsRoutes);
router.use("/api/v1/", orderRoutes);
router.use("/api/v1/", orderProductsRoutes);

export default router;