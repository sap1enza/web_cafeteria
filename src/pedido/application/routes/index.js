import express from "express";
import pedidos from "./pedidosRoutes.js";
import clients from "./clientsRoutes.js";


const router = (app) => {
    app.route('/').get((request, response) => {
        response.status(200).send({'api-version' : '1.0.0'});
    });
    app.use(
        express.json(),
        pedidos,
        clients
    );
};

export default router;