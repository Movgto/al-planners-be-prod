"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auhtenticateAdmin = void 0;
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = require("jsonwebtoken");
const helpers_1 = require("../helpers");
const auhtenticateAdmin = async (req, res, next) => {
    const bearer = req.headers.authorization;
    try {
        if (!bearer) {
            return res.status(401).json({ error: 'Acción no autorizada' });
        }
        const token = bearer.split(' ')[1];
        const userData = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        if (typeof userData === 'object' && userData.id) {
            const userExists = await User_1.default.findById(userData.id).select('id email name admin');
            if (!userExists) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            if (!userExists.admin) {
                return res.status(401).json({ error: 'Acción no autorizada' });
            }
            req.user = userExists;
        }
        else {
            res.status(401).json({ error: 'Acción no autorizada' });
        }
    }
    catch (error) {
        (0, helpers_1.handleInternalError)(error, 'Algo falló al intentar autenticarte', res);
    }
    next();
};
exports.auhtenticateAdmin = auhtenticateAdmin;
//# sourceMappingURL=auth.js.map