"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = __importDefault(require("../models/Event"));
const helpers_1 = require("../helpers");
const AvailabilityTime_1 = __importDefault(require("../models/AvailabilityTime"));
const Mailing_1 = __importDefault(require("../services/Mailing"));
class EventsController {
    static getEvents = async (req, res) => {
        try {
            const events = await Event_1.default.find().sort({ 'start.dateTime': 'asc' });
            res.json(events);
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Algo fallo al obtener los eventos', res);
        }
    };
    static getEvent = async (req, res) => {
        const { eventId } = req.params;
        try {
            const eventExists = await Event_1.default.findById(eventId);
            if (!eventExists) {
                return res.status(404).json({ error: 'Evento no encontrado' });
            }
            res.json(eventExists);
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Ocurrió un error al intentar obtener la cita', res);
        }
    };
    static createEvent = async (req, res) => {
        const event = req.body;
        try {
            const events = await Event_1.default.find();
            const newEvent = new Event_1.default(event);
            const newEventDate = (0, helpers_1.getDateInTimezone)(new Date(newEvent.start.dateTime));
            const newEventStartHour = newEventDate.getHours();
            const newEventEndHour = (0, helpers_1.getDateInTimezone)(new Date(newEvent.end.dateTime)).getHours();
            const eventsWithSameStartTimes = events.filter(e => e.start.dateTime === newEvent.start.dateTime);
            const availableTimes = (await AvailabilityTime_1.default.find()).filter(a => {
                const aDate = (0, helpers_1.getDateInTimezone)(new Date(a.startTime));
                if (aDate.getDate() === newEventDate.getDate()) {
                    return true;
                }
                return false;
            });
            const availabilityTimeForNewEvent = {
                startTime: newEvent.start.dateTime,
                endTime: newEvent.end.dateTime
            };
            let isInAvailableTime = false;
            if (availableTimes.length) {
                for (const a of availableTimes) {
                    if (!(0, helpers_1.isAvailabilityValid)(availabilityTimeForNewEvent, a)) {
                        isInAvailableTime = true;
                        break;
                    }
                }
            }
            else {
                return res.status(409).json({ error: 'No hay tiempo de disponibilidad para citas este día' });
            }
            if (!isInAvailableTime) {
                return res.status(409).json({ error: 'La cita que se intentó crear está fuera de los tiempos de disponibilidad' });
            }
            if (eventsWithSameStartTimes.length) {
                return res.status(409).json({ error: 'Ya hay una cita programada con la misma fecha y hora' });
            }
            let isInMiddleOfOtherEvent = false;
            for (let e of events) {
                const eDate = (0, helpers_1.getDateInTimezone)(new Date(e.start.dateTime));
                if (eDate.getDate() === newEventDate.getDate()) {
                    const startHour = (0, helpers_1.getDateInTimezone)(new Date(e.start.dateTime)).getHours();
                    const endHour = (0, helpers_1.getDateInTimezone)(new Date(e.end.dateTime)).getHours();
                    if ((newEventStartHour < startHour && newEventEndHour > startHour)
                        || (newEventStartHour < endHour && newEventEndHour > endHour)
                        || (startHour < newEventStartHour && endHour > newEventStartHour)
                        || (startHour < newEventEndHour && endHour > newEventEndHour)) {
                        isInMiddleOfOtherEvent = true;
                        break;
                    }
                }
            }
            if (isInMiddleOfOtherEvent) {
                return res.status(409).json({ error: 'La cita que estás intentando crear queda en medio del curso de otra cita programada' });
            }
            await newEvent.save();
            const date = (0, helpers_1.getDateInTimezone)(new Date(newEvent.start.dateTime));
            await Mailing_1.default.sendAppointmentNotification({
                name: newEvent.attendee.name,
                email: newEvent.attendee.email,
                date: date
            });
            res.send('Nuevo evento creado exitosamente!\nRecuerda sincronizar tus eventos.');
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Algo fallo al intentar crear un evento', res);
        }
    };
}
exports.default = EventsController;
//# sourceMappingURL=EventsController.js.map