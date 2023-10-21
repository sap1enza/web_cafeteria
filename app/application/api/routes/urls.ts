import * as express from "express";
import customeRoutes from './customersRoutes';
import categoriesRoutes from './categoriesRoutes';

let router = express.Router();

router.use("/api/v1/", customeRoutes);
router.use("/api/v1/", categoriesRoutes);

export default router;