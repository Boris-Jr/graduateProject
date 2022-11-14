import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema({
    idEmployee: String,
    documType: String,
    positionId: { type: mongoose.Schema.ObjectId, ref: "positions" },
    name: String,
    lastName: String,
    numberPhone: String,
    mail: String,
    registerDate: { type: Date, default: Date.now },
    dbStatus: Boolean,
})

const employees = mongoose.model("employees", employeesSchema);
export default employees;