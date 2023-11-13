import { v2 as cloudinary } from "cloudinary";
import http from "http";
import connectDB from "./utils/db";
import { initSocketServer } from "./socketServer";
import { app } from "./app";
require("dotenv").config();
const server = http.createServer(app);

initSocketServer(server);

// create server
connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server is connected with port ${process.env.PORT}`);
  });
});
