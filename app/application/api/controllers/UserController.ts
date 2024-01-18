import * as HttpStatus from 'http-status';
import ResponseAPI from "../../core/ResponseAPI"
import UsuarioCasoDeUso from '../../../domain/cases/usuarioCasoDeUso';
import User from '../../../domain/entity/user';

class UserController{
    auth = (request, response) => {
        try {
            /**
             * criei um usuario mocado, motivo de nao ter escopo para criação de usuario.
             */
            let user = new User(
                "Bruno Blauzius schuindt",
                "brunoblauzius@gmail.com"
            );
            
            let token = new UsuarioCasoDeUso(user).autenticar()

            response.status(HttpStatus.OK).send(ResponseAPI.data({
                "access_token" : token,
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