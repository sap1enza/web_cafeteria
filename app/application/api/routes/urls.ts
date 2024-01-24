import * as express from "express";
import ClienteRoutes from './clienteRoutes';
import categoriesRoutes from './categoriaRoutes';
import produtoRoutes from './produtoRoutes';
import PedidoRoutes from './pedidoRoutes';
import checkoutRoutes from './checkoutRoutes';
import { IDataBase } from '../../../interfaces/IDataBase';
import userRouter from "./userRouter";

export default function urls(dbconnection: IDataBase) : express.Router {
    const router = express.Router();
    router.use("/api/v1/", ClienteRoutes(dbconnection));
    router.use("/api/v1/", categoriesRoutes(dbconnection));
    router.use("/api/v1/", produtoRoutes(dbconnection));
    router.use("/api/v1/", PedidoRoutes(dbconnection));
    router.use("/api/v1/", userRouter(dbconnection));
    router.use("/api/v1/", checkoutRoutes(dbconnection));
    return router
}