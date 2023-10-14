import mongoose from "mongoose";

let host = "mongodb://userdev:userDevTester@mongo:27017/projeto-pedidos"
// let host = "mongodb://userdev:userDevTester@localhost:27020/projeto-pedidos";

mongoose.connect(host, {
    serverSelectionTimeoutMS: 5000
  }).catch(err => {
    console.log(err)
});

export default mongoose.connection;