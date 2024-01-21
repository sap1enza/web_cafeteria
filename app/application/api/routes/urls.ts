import * as express from "express";
import ClienteRoutes from './clienteRoutes';
import categoriesRoutes from './categoriaRoutes';
import productsRoutes from './produtoRoutes';
import orderRoutes from './pedidoRoutes';
import checkoutRoutes from './checkoutRoutes';
import { IDataBase } from '../../../interfaces/IDataBase';

export default function urls(dbconnection: IDataBase) {
    const router = express.Router();

    router.use("/api/v1/", ClienteRoutes(dbconnection));
    router.use("/api/v1/", categoriesRoutes(dbconnection));
    router.use("/api/v1/", productsRoutes);
    router.use("/api/v1/", orderRoutes);
    router.use("/api/v1/", checkoutRoutes);
 return router
}
//export default router;
