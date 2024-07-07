"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const GoogleAPIController_1 = __importDefault(require("../controllers/GoogleAPIController"));
const express_validator_1 = require("express-validator");
const inputValidation_1 = __importDefault(require("../middleware/inputValidation"));
const router = (0, express_1.Router)();
router.get('/auth-url', GoogleAPIController_1.default.getAuthUrl);
router.post('/events/:eventId', (0, express_validator_1.param)('eventId').isMongoId().withMessage('Invalid event ID'), inputValidation_1.default, GoogleAPIController_1.default.createEvent);
router.post('/syncEvents', (0, express_validator_1.body)('code').notEmpty().withMessage('Ocurrió un error al conectarse al calendario'), inputValidation_1.default, GoogleAPIController_1.default.syncEvents);
router.get('/events', (0, express_validator_1.query)('code').notEmpty().withMessage('Ocurrió un error al conectarse al calendario'), inputValidation_1.default, GoogleAPIController_1.default.getEvents);
router.delete('/events/:eventId', (0, express_validator_1.param)('eventId').isMongoId().withMessage('Event ID not valid'), (0, express_validator_1.body)('code').notEmpty().withMessage('Ocurrió un error al conectarse al calendario'), inputValidation_1.default, GoogleAPIController_1.default.deleteEvent);
exports.default = router;
//# sourceMappingURL=googleapiRouter.js.map