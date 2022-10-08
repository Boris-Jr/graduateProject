import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";

import users from "./routes/users.js";
import role from "./routes/roles.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", users);
app.use("/api/role", role);


app.listen(process.env.PORT, () =>
    console.log("Backend server running on port: " + process.env.PORT)
);

db.dbConnection();
