"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = __importDefault(require("./config/cors"));
const morgan_1 = __importDefault(require("morgan"));
const googleapiRouter_1 = __importDefault(require("./routes/googleapiRouter"));
const eventsRouter_1 = __importDefault(require("./routes/eventsRouter"));
const eventTypesRouter_1 = __importDefault(require("./routes/eventTypesRouter"));
const availabilityRoutes_1 = __importDefault(require("./routes/availabilityRoutes"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
(0, dotenv_1.configDotenv)();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(cors_2.default));
app.use((0, morgan_1.default)('dev'));
app.use('/api/googleapi', googleapiRouter_1.default);
app.use('/api/events', eventsRouter_1.default);
app.use('/api/eventTypes', eventTypesRouter_1.default);
app.use('/api/availability', availabilityRoutes_1.default);
//Auth routes
app.use('/api/auth', authRouter_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map