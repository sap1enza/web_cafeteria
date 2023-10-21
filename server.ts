import * as express from "express";
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import applicationUrl from './app/application/api/routes/urls';
import Auth from "./app/application/api/middler/auth";
import userRouter from './app/application/api/routes/userRouter'

class Server{
    public app: express.Application;

    constructor () {
        this.app = express();
        this.middler();
        this.routes();
    }

    enableCors(){
        const options: cors.CorsOptions = {
            methods : "GET,OPTIONS,PUT,POST,DELETE",
            origin: "*"
        }
        this.app.use(cors(options));
    }

    middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    routes() {
        this.app.route('/').get((req, res) => {
            res.json({'version' : '1.0.0'});
        });
        this.app.use('/api/v1/', userRouter);

        this.app.use(Auth.validate);
        this.app.use("/", applicationUrl);
        
    }
}

export default new Server();