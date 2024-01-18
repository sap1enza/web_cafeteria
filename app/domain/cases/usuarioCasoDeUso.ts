import configs from "../../application/core/configs";
import JWT from "../../application/core/jwt";
import User from "../entity/user";

class UsuarioCasoDeUso{

    constructor(readonly user: User) {}

    public autenticar() : string {
        const authJwt = new JWT(configs.secret, this.user);
        return authJwt.sign();
    }
}

export default UsuarioCasoDeUso;