import * as express from "express";
import CheckoutController from "../../../controllers/CheckoutController";

let router = express.Router();

router.post('/checkout', CheckoutController.store);
router.post('/checkout/hook', CheckoutController.hook);
router.get('/checkout/:pedido_id/status', CheckoutController.findByIdPedido);


export default router;