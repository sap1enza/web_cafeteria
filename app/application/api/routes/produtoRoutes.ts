import * as express from "express";
import ProdutoController from "../controllers/ProdutoController";

let router = express.Router();

router.get('/produto', ProdutoController.all);
router.post('/produto', ProdutoController.store);
router.get('/produto/:id', ProdutoController.show);
router.put('/produto/:id', ProdutoController.update);
router.delete('/produto/:id', ProdutoController.delete);


export default router;