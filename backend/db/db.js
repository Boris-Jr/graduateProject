import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection with mongo: OK");
    } catch (e) {
        console.log("Connection with mongo: ERROR\n" + e);
    }
}

export default {dbConnection};