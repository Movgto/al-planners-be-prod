"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth2client = void 0;
const dotenv_1 = require("dotenv");
const googleapis_1 = require("googleapis");
(0, dotenv_1.configDotenv)();
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, GOOGLE_API_KEY } = process.env;
console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
exports.auth2client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
//# sourceMappingURL=googleapi.js.map