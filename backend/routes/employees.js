import express from "express";
import employees from "../controllers/employees.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/registerEmployye", employees.registerEmployye);
router.post("/updateEmployees/:_id", employees.updateEmployees);
router.get("/listEmployees", auth,  employees.listEmployees);
router.get("/findEmployee/:_id", employees.findEmployee);
router.put("/updateEmployees/:_id", employees.updateEmployees);
router.put("/deleteEmployee/:_id", employees.deleteEmployee);

export default router;