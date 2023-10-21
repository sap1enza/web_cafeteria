import * as express from "express";
import CategoriesController from "../controllers/CategoriesController";

let router = express.Router();

router.get('/categories', CategoriesController.all);
router.post('/categories', CategoriesController.store);
router.get('/categories/:id', CategoriesController.show);
router.put('/categories/:id', CategoriesController.update);
router.delete('/categories/:id', CategoriesController.delete);


export default router;