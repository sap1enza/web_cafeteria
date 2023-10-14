import mongoose from "mongoose";

let host = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_COLLECTION}`;

mongoose.connect(host, {
    serverSelectionTimeoutMS: 5000
}).then((resp) => {
  console.log("Conexão estabelecida.")
})
.catch(err => {
    console.log(err.message)
});

export default mongoose.connection;