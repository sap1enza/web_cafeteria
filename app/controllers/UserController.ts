import * as HttpStatus from 'http-status';
import ResponseAPI from "../../core/ResponseAPI"
import UsuarioCasoDeUso from '../../../cases/usuarioCasoDeUso';
import User from '../../../domain/entity/user';

class UserController{
    auth = (request, response) => {
        try {
            let user = new User(
                "Bruno Blauzius schuindt",
                "brunoblauzius@gmail.com"
            );
            let token = new UsuarioCasoDeUso(user).autenticar()
            response.status(HttpStatus.OK).send(ResponseAPI.data(token));

        } catch (err) {
            response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .send(ResponseAPI.error(err.message));
        }
    }
}

export default new UserController();