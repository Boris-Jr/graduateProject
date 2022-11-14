import mongoose from "mongoose";

const elementsSchema = new mongoose.Schema({
    referenceName: String,
    serialNumber: { type: String, unique: true, required: true},
    amount: String,
    destiny: String,
    imageUrl: String,
    authId: { type: mongoose.Schema.ObjectId, ref: "authorizations"},
    authStatus: { type: String,
        enum: {
        values: ['A', 'P', 'D'], //A: Autorizado, P: Pendiente, D: Denegado
        default: "P"
    }},
    authBy: { type: mongoose.Schema.ObjectId, ref: "users", required: true},
    authDate: Date,
    authNote: String,
    authLog: String,
    registerDate: { type: Date, default: Date.now },
    dbStatus: Boolean,
})

const elements = mongoose.model("elements", elementsSchema);
export default elements;