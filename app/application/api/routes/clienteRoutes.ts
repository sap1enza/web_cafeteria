import * as express from "express";
import ClienteController from "../controllers/ClienteController";

let router = express.Router();

router.get('/cliente', ClienteController.all);
router.post('/cliente', ClienteController.store);
router.get('/cliente/:id', ClienteController.show);
router.get('/cliente/:cpfcnpj/identify', ClienteController.identifyByCPF);
router.put('/cliente/:id', ClienteController.update);
router.delete('/cliente/:id', ClienteController.delete);


export default router;