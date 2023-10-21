import * as express from "express";
import CustomersController from "../controllers/CustomersController";

let router = express.Router();

router.get('/customers', CustomersController.all);
router.post('/customers', CustomersController.store);
router.get('/customers/:id', CustomersController.show);
router.get('/customers/:cpfcnpj/identify', CustomersController.identifyByCPF);
router.put('/customers/:id', CustomersController.update);
router.delete('/customers/:id', CustomersController.delete);


export default router;