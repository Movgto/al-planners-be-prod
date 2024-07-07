"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const auth_1 = require("../helpers/auth");
const helpers_1 = require("../helpers");
const bcrypt_1 = require("bcrypt");
class AuthController {
    static adminLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            const userExists = await User_1.default.findOne({ email });
            if (!userExists) {
                return res.status(404).json({ error: 'No se ha encontrado un usuario con el correo proporcionado' });
            }
            const passwordsMatch = (0, bcrypt_1.compare)(password, userExists.password);
            if (!passwordsMatch) {
                return res.status(400).json({ error: 'La contraseña es incorrecta' });
            }
            if (!userExists.admin) {
                return res.status(409).json({ error: 'No eres administrador' });
            }
            const jwtToken = (0, auth_1.generateJWT)({
                id: userExists.id
            });
            res.json(jwtToken);
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Algo falló al intentar autenticarte', res);
        }
    };
    static adminSignUp = async (req, res) => {
        try {
            const newUser = new User_1.default(req.body);
            newUser.password = await (0, auth_1.hashPassword)(newUser.password);
            newUser.confirmed = true;
            newUser.admin = true;
            await newUser.save();
            res.send('Usuario creado exitosamente!');
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Hubo un problema al intentar crear un nuevo usuario', res);
        }
    };
    static getAdmin = (req, res) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'No te has autenticado' });
            }
            if (!req.user.admin) {
                return res.status(401).json({ error: 'No te has autenticado' });
            }
            res.json(req.user);
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'No te has autenticado!', res);
        }
    };
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map