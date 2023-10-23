import * as express from "express";
import OrderProductsController from "../controllers/OrderProductsController";

let router = express.Router();

router.get('/order_products', OrderProductsController.all);
router.post('/order_products', OrderProductsController.store);
router.get('/order_products/:id', OrderProductsController.show);
router.put('/order_products/:id', OrderProductsController.update);
router.delete('/order_products/:id', OrderProductsController.delete);

export default router;
