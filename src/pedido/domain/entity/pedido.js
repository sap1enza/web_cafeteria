import mongoose from "mongoose";

const pedidos = mongoose.model('pedidos', new mongoose.Schema({
    'id' : {type: String},
    'description' : {type: String, required: true},
    'created' : {type: Date, default: Date.now},
    'modifed' : {type: Date, default: Date.now} 
}));

export default pedidos;