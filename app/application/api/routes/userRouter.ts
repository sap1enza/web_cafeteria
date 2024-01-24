import * as express from "express";
import UserController from "../controllers/UserController";
import { IDataBase } from "../../../interfaces/IDataBase";


export default function userRouter(dbconnection : IDataBase) : express.Router
{
    const controller = new UserController(dbconnection);
    const router = express.Router();
    router.post('/user/auth', controller.auth);
    return router;
}