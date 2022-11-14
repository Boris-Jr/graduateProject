import mongoose from "mongoose";

const campusSchema = new mongoose.Schema({
    campusId: { type: String, unique: true},
    name: String,
    registerDate: { type: Date, default: Date.now },
    dbStatus: Boolean,
})

const campus = mongoose.model("campus", campusSchema);
export default campus;