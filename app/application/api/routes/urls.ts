import * as express from "express";
import customeRoutes from './customersRoutes';

let router = express.Router();

router.use("/api/v1/", customeRoutes);

export default router;