import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    numberPhone: String,
    roleId: {type: mongoose.Schema.ObjectId, ref: "roles"},
    dbStatus: Boolean,
    registerData: {type: Date, default: Date.now},
});

const user = mongoose.model("users", userSchema);
export default user;