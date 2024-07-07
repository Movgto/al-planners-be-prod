"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAvailabilityValid = exports.getDateInTimezone = exports.getDateInTimezoneFromISO = exports.formatHour = exports.dateFormater = exports.handleInternalError = void 0;
const colors_1 = __importDefault(require("colors"));
const handleInternalError = (error, errorMsg, res) => {
    const err = new Error(errorMsg);
    console.log(colors_1.default.bgMagenta(err.message));
    console.log(error);
    res.status(500).json({ error: err.message });
};
exports.handleInternalError = handleInternalError;
const dateFormater = (isoDate) => {
    const date = new Date(isoDate);
    const displayDate = new Intl.DateTimeFormat('es-MX', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }).format(date);
    return displayDate;
};
exports.dateFormater = dateFormater;
const formatHour = (hour) => {
    const timeOfDay = hour >= 12 ? 'pm' : 'am';
    const newHour = hour > 12 ? hour - 12 : hour;
    return newHour + timeOfDay;
};
exports.formatHour = formatHour;
const getDateInTimezoneFromISO = (isoDate) => {
    return new Date(new Date(isoDate).toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));
};
exports.getDateInTimezoneFromISO = getDateInTimezoneFromISO;
const getDateInTimezone = (date) => {
    return new Date(date.toLocaleString('en-US', { timeZone: 'America/Mexico_City' }));
};
exports.getDateInTimezone = getDateInTimezone;
const isAvailabilityValid = (availability, availabilityToCompare) => {
    const newAvailabilityStartHour = (0, exports.getDateInTimezone)(new Date(availability.startTime)).getHours();
    const newAvailabilityEndHour = (0, exports.getDateInTimezone)(new Date(availability.endTime)).getHours();
    const availabilityStartHour = (0, exports.getDateInTimezone)(new Date(availabilityToCompare.startTime)).getHours();
    const availabilityEndHour = (0, exports.getDateInTimezone)(new Date(availabilityToCompare.endTime)).getHours();
    const differenceBetweenHours = Math.abs(newAvailabilityStartHour - newAvailabilityEndHour);
    console.log('====== Difference betweenhours ======');
    console.log(differenceBetweenHours);
    if (differenceBetweenHours < 1)
        return false;
    if (newAvailabilityStartHour === availabilityStartHour)
        return false;
    if ((newAvailabilityStartHour < availabilityStartHour && newAvailabilityEndHour > availabilityStartHour)
        || (newAvailabilityStartHour < availabilityEndHour && newAvailabilityEndHour > availabilityEndHour)
        || (availabilityStartHour < newAvailabilityStartHour && availabilityEndHour > newAvailabilityStartHour)
        || (availabilityStartHour < newAvailabilityEndHour && availabilityEndHour > newAvailabilityEndHour)) {
        return false;
    }
    return true;
};
exports.isAvailabilityValid = isAvailabilityValid;
//# sourceMappingURL=index.js.map