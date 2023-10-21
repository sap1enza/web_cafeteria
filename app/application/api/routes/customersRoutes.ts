import * as express from "express";
import CustomersControllers from "../controllers/CustomersControllers";

let router = express.Router();

router.get('/customers', CustomersControllers.all);
router.post('/customers', CustomersControllers.store);
router.get('/customers/:id', CustomersControllers.show);
router.get('/customers/:cpfcnpj/identify', CustomersControllers.identifyByCPF);
router.put('/customers/:id', CustomersControllers.update);
router.delete('/customers/:id', CustomersControllers.delete);


export default router;