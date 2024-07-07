"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const inputValidation_1 = __importDefault(require("../middleware/inputValidation"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/admins/login', (0, express_validator_1.body)('email').isEmail().withMessage('Email is not valid'), (0, express_validator_1.body)('password').notEmpty().withMessage('Password cannot be empty'), inputValidation_1.default, AuthController_1.default.adminLogin);
router.post('/admins/signup', (0, express_validator_1.body)('name').notEmpty().withMessage('Name cannot be empty'), (0, express_validator_1.body)('email').isEmail().withMessage('Email is not valid'), (0, express_validator_1.body)('password').notEmpty().withMessage('Password cannot be empty'), (0, express_validator_1.body)('password_confirmation').custom((val, { req }) => {
    if (req.body.password === val) {
        return true;
    }
    throw new Error('Las contraseñas no coinciden');
}), inputValidation_1.default, AuthController_1.default.adminSignUp);
router.get('/admins', auth_1.auhtenticateAdmin, AuthController_1.default.getAdmin);
exports.default = router;
//# sourceMappingURL=authRouter.js.map