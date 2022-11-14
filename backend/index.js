import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";

import users from "./routes/users.js";
import roles from "./routes/roles.js";
import campus from "./routes/campus.js";
import employees from "./routes/employees.js";
import positions from "./routes/positions.js";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", users);
app.use("/api/role", roles);
app.use("/api/campus", campus);
app.use("/api/employees", employees);
app.use("/api/positions", positions);

app.listen(process.env.PORT, () =>
    console.log("Backend server running on port: " + process.env.PORT)
);

db.dbConnection();
