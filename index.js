"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const colors_1 = __importDefault(require("colors"));
const port = process.env.PORT || 4000;
server_1.default.listen(port, () => {
    console.log(colors_1.default.bgCyan(`Listening to port ${port}`));
});
// const handler = ServerlessHttp(app)
// export { handler }
//# sourceMappingURL=index.js.map