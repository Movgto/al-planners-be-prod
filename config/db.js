"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
const node_process_1 = require("node:process");
const connectDB = async () => {
    try {
        const { connection } = await mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log(colors_1.default.bgCyan(`Connection to database succeeded!`), `Host: ${connection.host} Port: ${connection.port}`);
    }
    catch (error) {
        console.log(colors_1.default.bgRed('Could not connect to the server, exiting the application...'));
        (0, node_process_1.exit)(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map