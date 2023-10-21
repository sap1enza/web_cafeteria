import Server  from "./server";

let  port = process.env.PORT || 3000;

Server.app.listen(port, () => {
    console.log('Server exec: PORTA -> ' + port);
});