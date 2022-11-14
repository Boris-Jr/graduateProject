import express from "express";
import elements from "../controllers/elements.js";
import auth from "../middlewares/auth.js";
import permisedAuth from "../middlewares/permisedAuth.js";
const router = express.Router();

router.post("/registerElement/:_authId", elements.registerElement);
router.post("/updateElement/:_id", elements.updateElement);
router.get("/listElement", auth, elements.listElement);
router.get("/findElement/:_id", elements.findElement);
router.put("/updateElement/:_id", elements.updateElement);
router.put("/deleteElement/:_id", elements.deleteElement);
router.put("/authElement/:_id",auth,permisedAuth, elements.authElement);

export default router;