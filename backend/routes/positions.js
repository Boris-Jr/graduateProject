import express from "express";
import positions from "../controllers/positions.js";
const router = express.Router();

router.post("/registerPosition", positions.registerPosition);
router.post("/updatePosition/:_id", positions.updatePosition);
router.get("/listPosition", positions.listPosition);
router.get("/findPosition/:_id", positions.findPosition);
router.put("/updatePosition/:_id", positions.updatePosition);
router.put("/deletePosition/:_id", positions.deletePosition);

export default router;