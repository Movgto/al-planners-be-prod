"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EventsController_1 = __importDefault(require("../controllers/EventsController"));
const express_validator_1 = require("express-validator");
const inputValidation_1 = __importDefault(require("../middleware/inputValidation"));
const router = (0, express_1.Router)();
router.get('/', EventsController_1.default.getEvents);
router.get('/:eventId', (0, express_validator_1.param)('eventId').isMongoId().withMessage('Event id not valid'), inputValidation_1.default, EventsController_1.default.getEvent);
router.post('/', (0, express_validator_1.body)('summary').notEmpty().withMessage('Summary must not be empty'), (0, express_validator_1.body)('start').custom(val => {
    if (typeof val === 'object' && val.dateTime) {
        return true;
    }
    throw new Error('Invalid start object');
}), (0, express_validator_1.body)('end').custom(val => {
    if (typeof val === 'object' && val.dateTime) {
        return true;
    }
    throw new Error('Invalid start object');
}), (0, express_validator_1.body)('attendee').custom(val => {
    if (typeof val === 'object' && val.name && val.email) {
        return true;
    }
    throw new Error('Attendee doesn\'t have the required properties');
}), inputValidation_1.default, EventsController_1.default.createEvent);
exports.default = router;
//# sourceMappingURL=eventsRouter.js.map