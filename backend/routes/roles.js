import express from "express";
import role from "../controllers/roles.js";
const router = express.Router();

router.post("/registerRole", role.registerRole);

export default router;