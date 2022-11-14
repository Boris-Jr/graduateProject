import express from "express";
import role from "../controllers/roles.js";
const router = express.Router();

router.post("/registerRole", role.registerRole);
router.put("/updateRole/:_id", role.updateRole);

export default router;