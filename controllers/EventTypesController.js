"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventType_1 = __importDefault(require("../models/EventType"));
const helpers_1 = require("../helpers");
class EventTypesController {
    static getEventTypes = async (req, res) => {
        try {
            const eventTypes = await EventType_1.default.find();
            console.log('====== Event Types ======');
            console.log(eventTypes);
            res.json(eventTypes);
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Algo fallo al intentar obtener los tipos de eventos', res);
        }
    };
    static getEventType = async (req, res) => {
        const { eventTypeId } = req.params;
        try {
            const eventExists = await EventType_1.default.findById(eventTypeId);
            if (!eventExists) {
                return res.status(404).json({ error: 'Tipo de evento no encontrado' });
            }
            res.json(eventExists);
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Algo falló al intentar obtener el tipo de evento solicitado', res);
        }
    };
    static createEventType = async (req, res) => {
        try {
            console.log(req);
            await EventType_1.default.create(req.body);
            res.send('Se creo un nuevo tipo de evento exitosamente!');
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Algo fallo al intentar crear un nuevo tipo de evento', res);
        }
    };
    static deleteEventType = async (req, res) => {
        const { eventTypeId } = req.params;
        try {
            const eventTypeExists = await EventType_1.default.findById(eventTypeId);
            if (!eventTypeExists) {
                return res.status(404).json({ error: 'Event type was not found in the database' });
            }
            await eventTypeExists.deleteOne();
            res.send('Tipo de evento eliminado exitosamente!');
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Algo falló al intentar eliminar el tipo de evento', res);
        }
    };
}
exports.default = EventTypesController;
//# sourceMappingURL=EventTypesController.js.map