"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EventTypesController_1 = __importDefault(require("../controllers/EventTypesController"));
const express_validator_1 = require("express-validator");
const inputValidation_1 = __importDefault(require("../middleware/inputValidation"));
const router = (0, express_1.Router)();
router.get('/', EventTypesController_1.default.getEventTypes);
router.get('/:eventTypeId', (0, express_validator_1.param)('eventTypeId').isMongoId().withMessage('Invalid event type id'), inputValidation_1.default, EventTypesController_1.default.getEventType);
router.post('/', (0, express_validator_1.body)('name').notEmpty().withMessage('Name must not be empty'), (0, express_validator_1.body)('duration').isNumeric().withMessage('Duration must be a number'), (0, express_validator_1.body)('duration').custom(value => {
    if (+value < 0 || +value > 24) {
        throw new Error('La duracion debe ser entre 0 y 24');
    }
    return true;
}), inputValidation_1.default, EventTypesController_1.default.createEventType);
router.delete('/:eventTypeId', (0, express_validator_1.param)('eventTypeId').isMongoId().withMessage('Invlaid event type id'), inputValidation_1.default, EventTypesController_1.default.deleteEventType);
exports.default = router;
//# sourceMappingURL=eventTypesRouter.js.map