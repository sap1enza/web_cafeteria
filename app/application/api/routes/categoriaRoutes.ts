import * as express from "express";
import CategoriaController from "../controllers/CategoriaController";

let router = express.Router();

router.get('/categoria', CategoriaController.all);
router.post('/categoria', CategoriaController.store);
router.get('/categoria/:id', CategoriaController.show);
router.put('/categoria/:id', CategoriaController.update);
router.delete('/categoria/:id', CategoriaController.delete);


export default router;