import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
    name: String,
    description: String,
    permiss: String,    //Cadena delimitada por comas con los permisos de cada rol
    registerDate: { type: Date, default: Date.now },
    dbStatus: Boolean,
})

const role = mongoose.model("roles", roleSchema);
export default role;