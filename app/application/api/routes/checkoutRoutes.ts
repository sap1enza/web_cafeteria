import * as express from "express";
import CheckoutController from "../controllers/CheckoutController";

let router = express.Router();

router.post('/checkout', CheckoutController.store);
router.post('/checkout/:uuid/hook', CheckoutController.hook);


export default router;