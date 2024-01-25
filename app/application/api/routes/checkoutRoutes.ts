import * as express from "express";
import CheckoutController from "../../../controllers/CheckoutController";
import { IDataBase } from "../../../interfaces/IDataBase";

export default function CategoriaRoutes(dbconnection: IDataBase) {
    let router = express.Router();
    const checkoutController = new CheckoutController(dbconnection);
    router.post('/checkout', checkoutController.store);
    router.post('/checkout/hook', checkoutController.hook);
    router.get('/checkout/:pedido_id/status', checkoutController.findByIdPedido);
    return router;
}
