"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapi_1 = require("../config/googleapi");
const colors_1 = __importDefault(require("colors"));
const helpers_1 = require("../helpers");
const Event_1 = __importDefault(require("../models/Event"));
const googleapis_1 = require("googleapis");
let refreshToken = '';
const setCredentials = async (code) => {
    if (refreshToken !== '') {
        googleapi_1.auth2client.setCredentials({
            refresh_token: refreshToken
        });
    }
    else {
        const { tokens } = await googleapi_1.auth2client.getToken(code);
        refreshToken = tokens && tokens.refresh_token ? tokens.refresh_token : '';
        googleapi_1.auth2client.setCredentials(tokens);
        console.log('====== Tokens ======');
        console.log(code);
        console.log(tokens);
        console.log('====== Calendar ID ======');
        console.log(process.env.CALENDAR_ID);
    }
};
class GoogleAPIController {
    static getAuthUrl = (req, res) => {
        try {
            const url = googleapi_1.auth2client.generateAuthUrl({
                access_type: 'offline',
                scope: 'https://www.googleapis.com/auth/calendar'
            });
            res.json({ url });
        }
        catch (error) {
            const errorMessage = 'Something went wrong while trying to generate an auth url';
            (0, helpers_1.handleInternalError)(error, errorMessage, res);
        }
    };
    static getEvents = async (req, res) => {
        const { code } = req.query;
        try {
            await setCredentials(code);
            const calendarAPI = googleapis_1.google.calendar({ version: 'v3', auth: googleapi_1.auth2client });
            const events = await calendarAPI.events.list({
                calendarId: process.env.CALENDAR_ID,
                timeMin: new Date().toISOString(),
                singleEvents: true,
                orderBy: 'startTime'
            });
            res.json({ events: events.data.items });
        }
        catch (error) {
            console.log(colors_1.default.bgMagenta('An error happened while trying to connect to Google Calendar API'));
            console.log(error);
            res.status(500).json({
                error: 'Hubo un problema al conectarse con el calendario de Google'
            });
        }
    };
    static syncEvents = async (req, res) => {
        const code = req.body.code;
        console.log('====== Code from sync events method ======');
        console.log(code);
        try {
            const eventList = await Event_1.default.find({ sentToCalendar: false });
            if (!eventList || !eventList.length) {
                return res.status(404).json({ error: 'No hay eventos para sincronizar' });
            }
            await setCredentials(code);
            const calendarAPI = googleapis_1.google.calendar({ version: 'v3', auth: googleapi_1.auth2client });
            console.log('Calendar Id', process.env.CALENDAR_ID);
            for (const e of eventList) {
                await calendarAPI.events.insert({
                    calendarId: process.env.CALENDAR_ID,
                    auth: googleapi_1.auth2client,
                    requestBody: {
                        summary: e.summary,
                        description: 'Description test',
                        start: {
                            dateTime: e.start.dateTime,
                            timeZone: 'America/Mexico_City'
                        },
                        end: {
                            dateTime: e.end.dateTime,
                            timeZone: 'America/Mexico_City'
                        },
                        id: e.id,
                        attendees: [{
                                displayName: e.attendee.name,
                                email: e.attendee.email
                            }]
                    }
                });
                e.sentToCalendar = true;
                await e.save();
            }
            res.send('Eventos sincronizados con éxito!');
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'An error happened while trying to create an event', res);
        }
    };
    static createEvent = async (req, res) => {
        const code = req.query.code;
        const { eventId } = req.params;
        try {
            const eventExists = await Event_1.default.findById(eventId);
            if (!eventExists) {
                return res.status(404).json({ error: 'El evento que se desea sincronizar no fué encontrado' });
            }
            const { summary, start, end } = eventExists;
            setCredentials(code);
            const calendarAPI = googleapis_1.google.calendar({ version: 'v3', auth: googleapi_1.auth2client });
            await calendarAPI.events.insert({
                auth: googleapi_1.auth2client,
                calendarId: process.env.CLIENT_ID,
                requestBody: {
                    summary,
                    start,
                    end,
                }
            });
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'An error happened while trying to create an event', res);
        }
    };
    static deleteEvent = async (req, res) => {
        const id = req.params.eventId;
        const code = req.body.code;
        try {
            const eventExists = await Event_1.default.findById(id);
            if (!eventExists) {
                return res.status(404).json({ error: 'No se encontró el evento a eliminar' });
            }
            if (!eventExists.sentToCalendar) {
                console.log("Eliminando evento que aún no se envía al calendario de Google!");
                await eventExists.deleteOne();
                return res.send('El evento se eliminó correctamente!');
            }
            if (!code) {
                return res.status(400).json({ error: 'Necesitas acceder con Google antes de eliminar un evento que ha sido sincronizado' });
            }
            await setCredentials(code);
            const calendar = googleapis_1.google.calendar({ version: 'v3', auth: googleapi_1.auth2client });
            await calendar.events.delete({
                auth: googleapi_1.auth2client,
                calendarId: process.env.CALENDAR_ID,
                eventId: id
            });
            await eventExists.deleteOne();
            res.send('El evento ha sido eliminado, también en el calendario de Google!');
        }
        catch (error) {
            (0, helpers_1.handleInternalError)(error, 'Hubo un problema al intentar eliminar el evento', res);
        }
    };
}
exports.default = GoogleAPIController;
//# sourceMappingURL=GoogleAPIController.js.map