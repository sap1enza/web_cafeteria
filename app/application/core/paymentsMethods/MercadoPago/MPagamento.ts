import axios, { AxiosStatic } from "axios";
import Checkout from "../../../../domain/entity/checkout";
import IPaymentMethods from "../IPaymentsMethods";

class MPagamento implements IPaymentMethods {
    
    public auth_token: string;

    public url: string = process.env.MP_URL;

    public http: AxiosStatic;
    constructor () {
        this.init();
    }

    protected init = async() => {
        let url = this.url + '/oauth/token'
        let options = {
            'client_id' : process.env.MP_CLIENT_ID,
            'client_secret' : process.env.MP_CLIENT_SECRET,
            'grant_type' : "authorization_code",
        } 
        /**
         * definindo configurações padrão para chamadas http
         */
        axios.defaults.baseURL = this.url;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        await axios.post('/oauth/token', options)
        .then(response => {
            console.log(response);
            this.auth_token = response.data['token']
            axios.defaults.headers.common['Authorization'] = this.auth_token;
        });  
        this.http = axios; 
    }
    
    public store = async (checkout: Checkout) => {
        throw new Error("Method not implemented.");
    }

    public find = async (id: BigInt) => {
        throw new Error("Method not implemented.");
    }
    
}

export default MPagamento;

