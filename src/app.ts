import express, { Application } from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

import { dbConnection } from "./configs/db";
import { errorHandler } from "./middlewares/error-handler.middleware";
import routes from "./routes";
import  {Consumer} from "./workers/consumer"
const {consumeMessage} =new Consumer;

dotenv.config();
dbConnection();

const app: Application = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/src/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/", routes);
consumeMessage()
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log(`Connected: ${socket.id}`);

  socket.on("ping", (cb: () => void) => {
    console.log("Ping received");
    cb();
  });
  socket.on("join-chats", (roomIds: string[] | string) => {
    socket.join(roomIds);
    console.log(`Socket ${socket.id} joined rooms:`, roomIds);
  });

  socket.on("message-sender", ({ room, message }: { room: string; message: any }) => {
    console.log(`Message to room ${room}:`, message);
    io.to(room).emit("message-reciever", message);
  });

  socket.on("disconnect", () => {
    console.log(`Disconnected: ${socket.id}`);
  });
});

const APP_PORT = process.env.APP_PORT || 8080;
server.listen(APP_PORT, () => {
  console.log("Server started on port", APP_PORT);
});
