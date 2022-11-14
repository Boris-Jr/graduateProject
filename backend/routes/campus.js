import express from "express";
import campus from "../controllers/campus.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/registerCampus", campus.registerCampus);
router.post("/validateCampusId", campus.validateCampusId);
router.post("/updateCampus/:_id", campus.updateCampus);
router.get("/listCampus", auth, campus.listCampus);
router.get("/findCampus/:_id", campus.findCampus);
router.put("/updateCampus/:_id", campus.updateCampus);
router.put("/deleteCampus/:_id", campus.deleteCampus);

export default router;