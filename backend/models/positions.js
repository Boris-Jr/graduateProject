import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
    positionId: { type: String, unique: true},
    name: String,
    registerDate: { type: Date, default: Date.now },
    dbStatus: Boolean,
})

const position = mongoose.model("positions", positionSchema);
export default position;