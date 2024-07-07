"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const server_1 = __importDefault(require("./server"));
const serverless_http_1 = __importDefault(require("serverless-http"));
// const port = process.env.PORT || 4000
// app.listen(port, () => {
//   console.log(colors.bgCyan(`Listening to port ${port}`))
// })
const handler = (0, serverless_http_1.default)(server_1.default);
exports.handler = handler;
//# sourceMappingURL=index.js.map