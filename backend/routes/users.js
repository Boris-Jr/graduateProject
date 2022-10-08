import express from "express";
import users from "../controllers/users.js";

const router = express.Router();

router.post("/registerUsers", users.registerUser);
router.post("/login", users.login);

export default router;