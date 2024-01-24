import * as express from "express";
import CheckoutController from "../controllers/CheckoutController";
import { IDataBase } from "../../../interfaces/IDataBase";

export default function checkoutRouter(dbconnection : IDataBase) : express.Router
{
    const router = express.Router();
    const controller = new CheckoutController(dbconnection);
    router.post('/checkout', controller.store);
    router.post('/checkout/:uuid/hook', controller.hook);
    router.get('/checkout/:pedido_id/status', controller.findByIdPedido);
    return  router;
}