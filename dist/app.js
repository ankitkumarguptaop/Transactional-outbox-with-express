"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./configs/db");
const error_handler_middleware_1 = require("./middlewares/error-handler.middleware");
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
(0, db_1.dbConnection)();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    },
});
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use("/", routes_1.default);
app.use(error_handler_middleware_1.errorHandler);
io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.on("ping", (cb) => {
        console.log("Ping received");
        cb();
    });
    socket.on("join-chats", (roomIds) => {
        socket.join(roomIds);
        console.log(`Socket ${socket.id} joined rooms:`, roomIds);
    });
    socket.on("message-sender", ({ room, message }) => {
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
