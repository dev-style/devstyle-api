import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createAffiliation, updateClickCount } from "../controllers/affiliation.controller";
const affiliationRoute = express.Router();

affiliationRoute.post("/affiliation/create", isAutheticated,authorizeRoles("admin"), createAffiliation );

affiliationRoute.put("/affiliation/:affiliate", updateClickCount );

affiliationRoute.get("/get-affiliation/:type",);


export default affiliationRoute;