import express from "express";

import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createAmbassador } from "../controllers/ambassador.controller";

const ambassadorRoute = express.Router();

ambassadorRoute.post("/ambassador/create", createAmbassador);

export default ambassadorRoute;
