"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const inputValidation = (req, res, next) => {
    console.log(req.body);
    const result = (0, express_validator_1.validationResult)(req);
    console.log(result);
    if (!result.isEmpty()) {
        return res.status(400).json({ error: result.array() });
    }
    next();
};
exports.default = inputValidation;
//# sourceMappingURL=inputValidation.js.map