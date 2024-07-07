"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AvailabilityTime_1 = __importDefault(require("../models/AvailabilityTime"));
const helpers_1 = require("../helpers");
const colors_1 = __importDefault(require("colors"));
class AvailabilityController {
    static createAvailableTime = async (req, res) => {
        const { startTime, endTime } = req.body;
        try {
            const date = (0, helpers_1.getDateInTimezone)(new Date(startTime));
            const diffBetweenHrs = date.getHours() - (0, helpers_1.getDateInTimezone)(new Date(endTime)).getHours();
            const absDiffBetweenHrs = Math.abs(diffBetweenHrs);
            if (diffBetweenHrs > 0) {
                return res.status(400).json({ error: 'El inicio de la disponibilidad no puede ser más tarde que el final' });
            }
            if (absDiffBetweenHrs < 1) {
                return res.status(400).json({ error: 'El tiempo de disponibilidad debe ser de al menos 1 hora' });
            }
            const availableTimes = (await AvailabilityTime_1.default.find()).filter(a => {
                const aDate = (0, helpers_1.getDateInTimezone)(new Date(a.startTime));
                if (date.getDate() === aDate.getDate()) {
                    return true;
                }
                return false;
            });
            let availabilityConflict = false;
            if (availableTimes.length) {
                console.log(colors_1.default.green('Buscando conflictos entre tiempos de disponibilidad'));
                console.log(availableTimes);
                for (const a of availableTimes) {
                    if (!(0, helpers_1.isAvailabilityValid)(req.body, a)) {
                        availabilityConflict = true;
                        break;
                    }
                }
            }
            if (availabilityConflict) {
                return res.status(409).json({ error: 'El tiempo de disponibilidad que se intento crear está en conflicto con otro existente' });
            }
            await AvailabilityTime_1.default.create({ startTime, endTime });
            res.send('Tiempo de disponibilidad creado con éxito!');
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Algo falló al intentar crear el tiempo de disponibilidad', res);
        }
    };
    static getAvailableTime = async (req, res) => {
        const { date: isoDate } = req.params;
        try {
            const date = (0, helpers_1.getDateInTimezone)(new Date(isoDate));
            console.log('====== Fecha para buscar disponibilidad ======');
            console.log(date);
            const availableTimes = await AvailabilityTime_1.default.find().sort({
                "startTime": "asc"
            });
            const availableTimesArray = availableTimes.filter(a => {
                const aDate = (0, helpers_1.getDateInTimezone)(new Date(a.startTime));
                console.log('====== Fecha disponible hora de inicio ======');
                console.log(aDate);
                if (aDate.getDate() === date.getDate()) {
                    return true;
                }
                return false;
            });
            res.json(availableTimesArray);
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Algo falló al intentar obtener los tiempos de disponibilidad', res);
        }
    };
    static deleteAvailableTime = async (req, res) => {
        const { availabilityId } = req.params;
        try {
            const availabilityExists = await AvailabilityTime_1.default.findById(availabilityId);
            if (!availabilityExists) {
                return res.status(404).json({ error: 'No se encontro la disponibilidad que se intentaba eliminar' });
            }
            await availabilityExists.deleteOne();
            res.send('Disponibilidad eliminada exitósamente!');
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Algo falló al intentar eliminar la disponibilidad', res);
        }
    };
    static getAvailableTimes = async (req, res) => {
        const { date: isoDate } = req.params;
        try {
            const date = (0, helpers_1.getDateInTimezoneFromISO)(isoDate);
            date.setHours(0, 0, 0, 0);
            const availableTimes = await AvailabilityTime_1.default.find().sort({
                "startTime": "asc"
            });
            const filtered = availableTimes.filter(a => {
                const aDate = (0, helpers_1.getDateInTimezone)(new Date(a.startTime));
                if (aDate.getTime() < date.getTime())
                    return false;
                return true;
            });
            res.json(filtered);
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Algo falló al intentar obtener la disponibilidad', res);
        }
    };
}
exports.default = AvailabilityController;
//# sourceMappingURL=AvailabilityController.js.map