"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = exports.hashPassword = exports.generateToken = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const generateToken = () => {
    return Math.round(Math.random() * 999999).toString().padStart(6, '0');
};
exports.generateToken = generateToken;
const hashPassword = async (psw) => {
    const salt = await (0, bcrypt_1.genSalt)(10);
    const password = await (0, bcrypt_1.hash)(psw, salt);
    return password;
};
exports.hashPassword = hashPassword;
const generateJWT = (user) => {
    const jwt = (0, jsonwebtoken_1.sign)(user, process.env.JWT_SECRET, { expiresIn: '180d' });
    return jwt;
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=auth.js.map