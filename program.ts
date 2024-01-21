import Server  from "./server";
// import * as dotenv from 'dotenv';
// dotenv.config();

let  port = process.env.PORT || 3000;

Server.app.listen(port, () => {
    console.log('Server exec: PORTA -> ' + port);
});