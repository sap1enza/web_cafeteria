import * as express from "express";
import ProductsController from "../controllers/ProductsController";

let router = express.Router();

router.get('/products', ProductsController.all);
router.post('/products', ProductsController.store);
router.get('/products/:id', ProductsController.show);
router.put('/products/:id', ProductsController.update);
router.delete('/products/:id', ProductsController.delete);


export default router;