import express from "express";
import { connectDB } from "./DB/connection.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./config/.env") });

connectDB();
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

///////////////////////////// ****** Socket ****** //////////////////////
import { Server } from "socket.io";
import http from "http";
import { isAuthenticated } from "./middleware/authentication.socket.js";
import { msgHandler } from "./src/modules/chat/msgHandler.js";

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: "*",
});

// authentication middleware
io.use(isAuthenticated);

const onConnection = (socket) => {
  // messagesHandler
  msgHandler(io, socket);
};

io.on("connection", onConnection);

httpServer.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
