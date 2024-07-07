"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const inputValidation_1 = __importDefault(require("../middleware/inputValidation"));
const AvailabilityController_1 = __importDefault(require("../controllers/AvailabilityController"));
const router = (0, express_1.Router)();
router.post('/', (0, express_validator_1.body)('startTime').isISO8601().withMessage('Start time format is not valid'), (0, express_validator_1.body)('endTime').isISO8601().withMessage('End time format is not valid'), inputValidation_1.default, AvailabilityController_1.default.createAvailableTime);
router.post('/:date', (0, express_validator_1.param)('date').isISO8601().withMessage('Date format not valid'), inputValidation_1.default, AvailabilityController_1.default.getAvailableTimes);
router.get('/:date', (0, express_validator_1.param)('date').isISO8601().withMessage('Date format not valid'), inputValidation_1.default, AvailabilityController_1.default.getAvailableTime);
router.delete('/:availabilityId', (0, express_validator_1.param)('availabilityId').isMongoId().withMessage('Invalid availability ID'), inputValidation_1.default, AvailabilityController_1.default.deleteAvailableTime);
exports.default = router;
//# sourceMappingURL=availabilityRoutes.js.map