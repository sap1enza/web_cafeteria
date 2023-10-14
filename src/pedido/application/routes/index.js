import express from "express";
import pedidos from "./pedidosRoutes.js";


const router = (app) => {
    app.route('/').get((request, response) => {
        response.status(200).send({'api-version' : '1.0.0'});
    });
    app.use(
        express.json(),
        pedidos
    );
};

export default router;