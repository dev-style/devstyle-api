import express from "express";

import { authorizeRoles, isAutheticated } from "../middleware/auth";

const ambassadorRoute = express.Router();

ambassadorRoute.post("/registration-ambassador");

ambassadorRoute.post("/activate-ambassador");

ambassadorRoute.post("/login-ambassador");

export default ambassadorRoute;
