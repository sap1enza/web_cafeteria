import * as express from "express";
import OrdersController from "../controllers/OrdersController";

let router = express.Router();

router.get('/orders', OrdersController.all);
router.post('/orders', OrdersController.store);
router.get('/orders/:id', OrdersController.show);
router.put('/orders/:id', OrdersController.update);
router.delete('/orders/:id', OrdersController.delete);

export default router;
