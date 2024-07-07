"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsConfig = {
    origin: (origin, cb) => {
        const whitelist = [process.env.FRONTEND_URL];
        if (whitelist.includes(origin)) {
            cb(null, true);
        }
        else {
            cb(new Error('CORS error'), false);
        }
    }
};
exports.default = corsConfig;
//# sourceMappingURL=cors.js.map