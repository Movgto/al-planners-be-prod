"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const nodemailer_1 = __importDefault(require("../config/nodemailer"));
const helpers_1 = require("../helpers");
const Mailing_1 = require("../helpers/Mailing");
const components_1 = require("@react-email/components");
class Mailing {
    static sendAppointmentNotification = async (params) => {
        const hour = params.date.getHours();
        const dateString = (0, helpers_1.dateFormater)(params.date.toISOString());
        const html = (0, components_1.render)((0, jsx_runtime_1.jsx)(Mailing_1.HtmlForEventNotification, { name: params.name, hour: (0, helpers_1.formatHour)(hour), date: dateString }));
        await nodemailer_1.default.sendMail({
            from: 'AL PLANNERS <alplanners@gmail.com>',
            to: params.email,
            subject: 'AL PLANNERS Notificación de Cita',
            text: `Se ha programado una cita con nosotros para ${params.date}`,
            attachments: [{
                    cid: 'alplannerslogo',
                    filename: 'al_planners_logo.png',
                    path: `${process.env.FRONTEND_URL}/al_planners_logo.png`
                }],
            html: html
        });
    };
}
exports.default = Mailing;
//# sourceMappingURL=Mailing.js.map