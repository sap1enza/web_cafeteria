import * as HttpStatus from 'http-status';
import ResponseAPI from "../../core/ResponseAPI"
import JWT from '../../core/jwt';
import configs from '../../core/configs';
import User from '../../../domain/entity/user';

class UserController{
    auth = (request, response) => {
        try {
            /**
             * criei um usuario mocado, motivo de nao ter escopo para criação de usuario.
             */
            const authJwt = new JWT(configs.secret, new User(
                "Bruno Blauzius schuindt",
                "brunoblauzius@gmail.com"
            ));
            response.status(HttpStatus.OK).send(ResponseAPI.data({
                "access_token" : authJwt.sign(),
                "expires_in": 3600,
                "scope": "customScope",
                "token_type": "Bearer"
            }));

        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(ResponseAPI.error(err.message));
        }
    }
}

export default new UserController();