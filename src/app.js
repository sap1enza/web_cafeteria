import express from "express";
import cors from "cors";
import db from "./config/dbConnect.js"
import router from './pedido/application/routes/index.js';

db.on("error", err => {
    console.error(err);
});
db.once("OPEN", () => {
    console.log("conexão estabelecida com sucesso");
})

const app = express();

app.use(cors())

router(app);

export default app