import * as express from "express";
import UserController from "../../../controllers/UserController";

let router = express.Router();

router.post('/user/auth', UserController.auth);

export default router;