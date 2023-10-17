import express from "express";

import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  activateAmbassador,
  loginAmbassador,
  registrationAmbassador
} from "../controllers/ambassador.controller";
const ambassadorRoute = express.Router();

ambassadorRoute.post("/registration-ambassador", registrationAmbassador);

ambassadorRoute.post("/activate-ambassador", activateAmbassador);

ambassadorRoute.post("/login-ambassador", loginAmbassador);

export default ambassadorRoute;
