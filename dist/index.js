"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
app.set("strict routing", true);
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("tiny"));
app.disable("x-powered-by");
app.get("/", (req, res, next) => {
    try {
        return res.status(200).json({
            message: "Hello, Blog Api",
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});
app.use((req, res) => {
    res.status(404).json({
        message: "Route does Not Exist",
    });
});
let port;
port = process.env.NODE_ENV === "development" ? 8083 : 9999;
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});
server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
        port += 6;
        console.error("Port already in use : retrying");
        setTimeout(() => {
            server.close();
            server.listen(port);
        }, 1000);
    }
});
