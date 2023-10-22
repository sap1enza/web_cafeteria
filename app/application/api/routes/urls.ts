import * as express from "express";
import customeRoutes from './customersRoutes';
import categoriesRoutes from './categoriesRoutes';
import productsRoutes from './productsRoutes';

let router = express.Router();

router.use("/api/v1/", customeRoutes);
router.use("/api/v1/", categoriesRoutes);
router.use("/api/v1/", productsRoutes);

export default router;